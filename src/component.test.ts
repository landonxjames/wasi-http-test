import { IncomingMessage } from "http";
import { client } from "./generated-js-runtime-bindings/wasi_http_tests_component.js";
import { describe, test, expect } from "vitest";
import * as workerpool from "workerpool";

describe("Component runtime functions", async () => {
  test("client test", async () => {
    const testClient = new client.WasiHttpTestsClient();
    // const httpReturnRawBodyData = testClient.httpCall();
    // const httpReturnJson = JSON.parse(httpReturnRawBodyData);
    // console.log("PARSED JSON: ", httpReturnJson);

    const pool = workerpool.pool();
    const proxy = new Proxy(testClient, {
      get(target, prop, receiver) {
        // console.log("AARGUMENTS:", arguments);
        const value = target[prop];
        // console.log("PROP:", prop);
        // console.log("VAL:", value);
        if (value instanceof Function && prop === "httpCall") {
          function wrapper() {
            //If you need the arguments they are available in this function
            console.log("ARGUMENTS:", arguments);
            return new Promise((resolve, reject) => {
              //Do the work in here to instantace a new WASM module
              //call the async function, and return/fail based on the return of that
              try {
                const blah = target[prop](...arguments);
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

    // console.log("PROXY:", proxy);

    // console.log("PROXY FUN:", proxy.httpCall);

    // console.log("PROXY FUN CALLED:", proxy.httpCall());

    // const proxyReturnRaw1 = await proxy.httpCall(5000);
    // console.log("proxyReturnRaw:", proxyReturnRaw1);
    // const proxyReturn1 = JSON.parse(proxyReturnRaw1);

    // console.log("proxyReturn:", proxyReturn);

    // expect(proxyReturn1.code).toBe(200);
    // expect(proxyReturn1.description).toBe("OK");

    const [proxyReturnRaw1, proxyReturnRaw2] = await Promise.all([
      proxy.httpCall(5000),
      proxy.httpCall(1000),
    ]);

    console.log("proxyReturnRaw1:", proxyReturnRaw1);
    console.log("proxyReturnRaw2:", proxyReturnRaw2);

    const proxyReturn1 = JSON.parse(proxyReturnRaw1);
    const proxyReturn2 = JSON.parse(proxyReturnRaw2);
    expect(proxyReturn1.code).toBe(200);
    expect(proxyReturn1.description).toBe("OK");
    expect(proxyReturn2.code).toBe(200);
    expect(proxyReturn2.description).toBe("OK");
  });
});
