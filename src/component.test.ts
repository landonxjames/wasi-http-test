import { IncomingMessage } from "http";
import {
  clients,
  events,
} from "./generated-js-runtime-bindings/wasm_version_tests_component.js";
import { describe, test, expect } from "vitest";

describe("Component runtime functions", () => {
  test("client test", () => {
    console.log("AHHHH");
    const testClient = new clients.WasmVersionTestsClient();

    expect(testClient.helloWorld()).toBe("Hello World");
  });

  test("event parse test success", async () => {
    const testEvent = new events.WasmVersionTestsEvent();
    const testJson = { bar: "ATestString" };
    const parsedEvent = testEvent.parse(JSON.stringify(testJson));
    console.log("RESPONSE?:", parsedEvent);
    console.log("STATUS:", parsedEvent.status());
    console.log("CONSUME:", parsedEvent.consume());

    // expect(parsedEvent.bar).toBe("ATestString");
  });

  // test("event parse test failure", () => {
  //   const testEvent = new events.WasmVersionTestsEvent();
  //   const testJson = { notBar: "ATestString" };

  //   expect(() => {
  //     testEvent.parse(JSON.stringify(testJson));
  //   }).toThrow("missing field `bar`");
  // });
});
