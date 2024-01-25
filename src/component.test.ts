import { IncomingMessage } from "http";
import { client } from "./generated-js-runtime-bindings/wasi_http_tests_component.js";
import type { WasiHttpTestsClient } from "./generated-js-runtime-bindings/interfaces/wasi-http-tests-component-client.js";
import { describe, test, expect } from "vitest";
import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from "node:worker_threads";

describe("Component runtime functions", async () => {
  // test("client test", async () => {
  //   const testClient = new client.WasiHttpTestsClient();
  //   const testClient2 = new client.WasiHttpTestsClient();
  //   const proxy = createProxy(testClient);
  //   const proxy2 = createProxy(testClient2);

  //   //Note that even though proxy and proxy2 are different instances of the
  //   //WasiHttpTestsClient class they still access the same compiled wasm module
  //   //so these calls still stack
  //   const start = Date.now();
  //   const [proxyReturnRaw1, proxyReturnRaw2] = await Promise.all([
  //     proxy.httpCall(5000),
  //     proxy2.httpCall(1000),
  //     sleepThenReturn(3000),
  //   ]);
  //   const elapsed = Date.now() - start;
  //   console.log(
  //     `seconds elapsed during http call = ${Math.floor(elapsed / 1000)}`
  //   );

  //   console.log("proxyReturnRaw1:", proxyReturnRaw1);
  //   console.log("proxyReturnRaw2:", proxyReturnRaw2);

  //   const proxyReturn1 = JSON.parse(proxyReturnRaw1);
  //   const proxyReturn2 = JSON.parse(proxyReturnRaw2);
  //   expect(proxyReturn1.code).toBe(200);
  //   expect(proxyReturn1.description).toBe("OK");
  //   expect(proxyReturn2.code).toBe(200);
  //   expect(proxyReturn2.description).toBe("OK");
  // });

  // test("worker test 1", async () => {
  //   const testClient = new client.WasiHttpTestsClient();
  //   const proxy = createWorkerProxy(testClient);

  //   //This Promise.all will last approx as long as the longest of the two
  //   //times passed to the functions below
  //   const start = Date.now();
  //   const [proxyReturnRaw1, sleepReturn] = await Promise.all([
  //     proxy.httpCall(4000),
  //     sleepThenReturn(2000),
  //   ]);
  //   const elapsed = Date.now() - start;
  //   console.log(
  //     `seconds elapsed during http call = ${Math.floor(elapsed / 1000)}`
  //   );

  //   console.log("proxyReturnRaw1:", proxyReturnRaw1);

  //   const proxyReturn1 = JSON.parse(proxyReturnRaw1);

  //   expect(proxyReturn1.code).toBe(200);
  //   expect(proxyReturn1.description).toBe("OK");
  // }, 20000);

  test("worker test 2", async () => {
    const opts = {
      moduleName:
        "./generated-js-runtime-bindings/wasi_http_tests_component.js",
      interfaceName: "client",
      resourceName: "foo",
      functionName: "bar",
      args: [],
    };
    await workerCreator(opts);
  }, 20000);
});

const createProxy = <T extends Object>(client: T) => {
  return new Proxy(client, {
    get(target, prop, receiver) {
      const value = target[prop];

      if (value instanceof Function && prop === "httpCall") {
        function wrapper() {
          console.log("ARGS IN WRAPPER:", arguments);
          const args = arguments;
          //If you need the arguments they are available in this function
          return new Promise((resolve, reject) => {
            try {
              const blah = target[prop](...args);
              resolve(blah);
            } catch (err) {
              reject(err);
            }
          });
        }
        return wrapper;
      }
      return value;
    },
  });
};

//TODO: try to get the worker code into this file so we don't need a
//external file reference to do all of this
const createWorkerProxy = <T extends Object>(client: T) => {
  return new Proxy(client, {
    get(target, prop, receiver) {
      const value = target[prop];

      if (value instanceof Function && prop === "httpCall") {
        function wrapper() {
          console.log("ARGS IN WRAPPER:", arguments);
          const args = arguments;
          return new Promise(function (resolve, reject) {
            const worker = new Worker(
              "/Volumes/workplace/wasi-http-test/src/worker.js",
              {
                workerData: {
                  resourceName: "WasiHttpTestsClient",
                  functionName: "httpCall",
                  args: [...args],
                },
              }
            );
            worker.on("message", (data) => {
              // console.log("MESSAGE IN MAIN:", data);
              resolve(data);
            });
            worker.on("error", (err) => {
              reject(`An error ocurred: ${err}`);
            });
          });
        }
        return wrapper;
      }
      return value;
    },
  });
};

const sleepWrapper = (ms: number) => new Promise((r) => setTimeout(r, ms));
const sleepThenReturn = async (sleep: number): Promise<string> => {
  await sleepWrapper(sleep);
  return "FOOBAR";
};

type WorkerInput = {
  moduleName: string;
  interfaceName: string;
  resourceName: string;
  functionName: string;
  args: any[];
};

const workerCreator = async (options: WorkerInput) => {
  console.log("WORKER CREATOR RUNNING");
  const workerFuncText = `(${workerFunction.toString()})()`;
  console.log("WORKER TEXT:", workerFuncText);
  return new Promise(function (resolve, reject) {
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

function workerFunction() {
  console.log("WORKER THREAD RUNNING");
  // const { Worker, isMainThread, parentPort, workerData } = await

  import("node:worker_threads").then((workerMod) => {
    const { Worker, isMainThread, parentPort, workerData } = workerMod;

    parentPort!.postMessage("AHHHHHH");
    const { moduleName, interfaceName, resourceName, functionName, args } =
      workerData as WorkerInput;
  });

  // const { moduleName, interfaceName, resourceName, functionName, args } =
  //   workerData as WorkerInput;

  // const wasmModule = await import(moduleName);

  // console.log("wasmModule in func:", wasmModule);

  // parentPort!.postMessage("AHHHHHH");
}
