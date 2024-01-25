import { client } from "./generated-js-runtime-bindings/wasi_http_tests_component.js";
import { Worker } from "node:worker_threads";

type WorkerInput = {
  moduleName: string;
  interfaceName: string;
  resourceName: string;
  functionName: string;
  args: any[];
};

//Util to create an awaitable worker
const workerCreator = async (options: WorkerInput) => {
  console.log("WORKER CREATOR RUNNING");
  //Wrap the worker func in an IIFE
  const workerFuncText = `(${workerFunction.toString()})()`;
  console.log("WORKER TEXT:", workerFuncText);
  return new Promise(function (resolve, reject) {
    //TODO: It might be worth using some kind of worker pool here
    //instead of spinning up a new one each time
    const worker = new Worker(workerFuncText, {
      eval: true,
      workerData: { ...options },
    });
    worker.on("message", (data) => {
      console.log("MESSAGE IN MAIN:", data);
      resolve(data);
    });
    worker.on("error", (err) => {
      reject(`An error ocurred: ${err}`);
    });
    worker.on("online", () => {
      console.log("WORKER ONLINE");
    });
  });
};

//The function that actually runs in the worker thread
//Note this didn't work in vitest because it was replacing the
//dynamic import() in the worker thread code with a custom function
//called __vite_ssr_dynamic_import__ that wasn't defined in the Worker context
const workerFunction = async () => {
  console.log("WORKER THREAD RUNNING");

  const { parentPort, workerData } = await import("node:worker_threads");
  const { moduleName, interfaceName, resourceName, functionName, args } =
    workerData as WorkerInput;

  //Dynamically load the jco generated module
  const wasmModule = await import(moduleName);

  //Extract the interface from the module
  //In practice this will probably always be "clients" because I doubt we want
  //to allow event parsing to be async
  const wasmExport = wasmModule[interfaceName];

  //TODO: need a way to capture params passed to the wit Resource/js Class
  //to instantiate it so we can instantiate it again here
  //Perhaps we should actually proxy the interface too and we can trap the
  //Class instantiation and also proxy the object returned by the constructor?
  const wasmResource = new wasmExport[resourceName]();

  //Actually call the function (synchronously)
  const data = wasmResource[functionName](...args);

  //Send the raw return from the function back to the main thread
  parentPort!.postMessage(data);
};

//Utils for testing that the wasm async stuff isn't blocking
const sleepWrapper = (ms: number) => new Promise((r) => setTimeout(r, ms));
const sleepThenReturn = async (sleep: number): Promise<string> => {
  await sleepWrapper(sleep);
  return "FOOBAR";
};

//Util to wrap the wasm module in a Proxy object that captures one function
//httpCall, delegates it to a worker thread, and makes it async
//Note that we have to provide the module name and the export from the module
//(a wit interface) because I do not believe we can derive those from
//the instantiated class that is passed in
const createProxy = <T extends Object>(
  client: T,
  //TODO: Figure out if theres a dynamic way to infer these values from the
  //passed in client
  opts: { moduleName: string; interfaceName: string }
) => {
  return new Proxy(client, {
    get(target, prop, receiver) {
      //This assertion is ugly, but its the only way I could index
      //an Object without tsc yelling at me
      const value: any = (target as any)[prop];

      if (value instanceof Function && prop === "httpCall") {
        function wrapper() {
          return workerCreator({
            moduleName: opts.moduleName,
            interfaceName: opts.interfaceName,
            resourceName: client.constructor.name,
            functionName: prop as string,
            args: [...arguments],
          });
        }
        return wrapper;
      }
      return value;
    },
  });
};

//Full example with proxied client
const wasmClient = new client.WasiHttpTestsClient();

//This proxied client is what we would actually return to users
//The moduleName had to be an absolute path, but I think that was because
//I was running this via tsx, will hopefully work with normal import path otherwise
const proxiedClient = createProxy(wasmClient, {
  moduleName:
    "/Volumes/workplace/wasi-http-test/src/generated-js-runtime-bindings/wasi_http_tests_component.js",
  interfaceName: "client",
});

const start = Date.now();
const [finalData] = await Promise.all([
  proxiedClient.httpCall(5000),
  sleepThenReturn(3000),
]);
//This value should be approximately the larger of the two values passed to
//the http call or the sleep
const elapsed = Date.now() - start;
console.log(`milliseconds elapsed during Promise.all = ${elapsed}`);

console.log("Final Data:", finalData);
