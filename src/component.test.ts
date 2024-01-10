import { IncomingMessage } from "http";
import { client } from "./generated-js-runtime-bindings/wasi_http_tests_component.js";
import { describe, test, expect } from "vitest";

describe("Component runtime functions", () => {
  test("client test", () => {
    const testClient = new client.WasiHttpTestsClient();
    const httpReturnRawBodyData = testClient.httpCall();
    const httpReturnJson = JSON.parse(httpReturnRawBodyData);

    console.log("PARSED JSON: ", httpReturnJson);
    expect(httpReturnJson.url).toBe("https://httpbin.org/get");
    expect(httpReturnJson.headers.Host).toBe("httpbin.org");
  });
});
