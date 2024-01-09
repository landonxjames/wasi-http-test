export namespace WasmVersionTestsComponentEvents {
  export { WasmVersionTestsEvent };
}
import type { IncomingResponse } from '../interfaces/wasi-http-types.js';
export { IncomingResponse };
import type { ErrorCode } from '../interfaces/wasi-http-types.js';
export { ErrorCode };
export interface Foo {
  bar: string,
}

export class WasmVersionTestsEvent {
  constructor()
  parse(input: string): IncomingResponse;
}
