import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from "node:worker_threads";
import { client } from "./generated-js-runtime-bindings/wasi_http_tests_component.js";
// import type { WasiHttpTestsClient } from "./generated-js-runtime-bindings/interfaces/wasi-http-tests-component-client.js";

// import { URL } from "url"; // in Browser, the URL in native accessible on window

// const __filename = new URL("", import.meta.url).pathname;

// if (isMainThread) {
// //   const worker = new Worker(__filename, { workerData: "hello" });
// //   worker.on("message", (msg) => console.log(`Worker message received: ${msg}`));
// //   worker.on("error", (err) => console.error(err));
// //   worker.on("exit", (code) => console.log(`Worker exited with code ${code}.`));
//   throw new Error("This code should not be run in the main thread")
// } else {
//   const data = workerData;
//   parentPort!.postMessage(`You said \"${data}\".`);
// }

//This is data passed in when the worker is created
// type workerInput = { resourceName: string; functionName: string; args: any[] };

if (isMainThread) {
  throw new Error("This code should not be run in the main thread");
}

const { resourceName, functionName, args } = workerData;

const clientInstance = new client[resourceName]();

const data = clientInstance[functionName](...args);

console.log("BEFORE POST IN WORKER");
parentPort.postMessage(data);

//The parent/main thread should not send messages here so not implementing
//All data should be passed in via workerData when worker is created
parentPort.on("message", (msg) => {});
