import {
  clients,
  events,
} from "./generated-js-runtime-bindings/wasm_version_tests_component.js";
import { describe, test, expect } from "vitest";

describe("Component runtime functions", () => {
  test("client test", () => {
    const testClient = new clients.WasmVersionTestsClient();

    expect(testClient.helloWorld()).toBe("Hello World");
  });

  test("event parse test success", () => {
    const testEvent = new events.WasmVersionTestsEvent();
    const testJson = { bar: "ATestString" };
    const parsedEvent = testEvent.parse(JSON.stringify(testJson));
    expect(parsedEvent.bar).toBe("ATestString");
  });

  test("event parse test failure", () => {
    const testEvent = new events.WasmVersionTestsEvent();
    const testJson = { notBar: "ATestString" };

    expect(() => {
      testEvent.parse(JSON.stringify(testJson));
    }).toThrow("missing field `bar`");
  });
});
