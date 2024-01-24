import { IncomingMessage } from "http";
import { client } from "./generated-js-runtime-bindings/wasi_http_tests_component.js";
import type { WasiHttpTestsClient } from "./generated-js-runtime-bindings/interfaces/wasi-http-tests-component-client.js";
import { describe, test, expect } from "vitest";

describe("Component runtime functions", async () => {
  test("client test", async () => {
    const testClient = new client.WasiHttpTestsClient();
    const testClient2 = new client.WasiHttpTestsClient();
    const proxy = createProxy(testClient);
    const proxy2 = createProxy(testClient2);

    //Note that even though proxy and proxy2 are different instances of the
    //WasiHttpTestsClient class they still access the same compiled wasm module
    //so these calls still stack
    const start = Date.now();
    const [proxyReturnRaw1, proxyReturnRaw2] = await Promise.all([
      proxy.httpCall(5000),
      proxy2.httpCall(5000),
      // sleepThenReturn(3000),
    ]);
    const elapsed = Date.now() - start;
    console.log(
      `seconds elapsed during http call = ${Math.floor(elapsed / 1000)}`
    );

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

const createProxy = <T extends Object>(client: T) => {
  return new Proxy(client, {
    get(target, prop, receiver) {
      const value = target[prop];

      if (value instanceof Function && prop === "httpCall") {
        function wrapper() {
          //If you need the arguments they are available in this function
          return new Promise((resolve, reject) => {
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
};

const sleepWrapper = (ms: number) => new Promise((r) => setTimeout(r, ms));
const sleepThenReturn = async (sleep: number): Promise<string> => {
  await sleepWrapper(sleep);
  return "FOOBAR";
};
