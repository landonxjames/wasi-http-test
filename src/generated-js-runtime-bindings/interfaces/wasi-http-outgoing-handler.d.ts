export namespace WasiHttpOutgoingHandler {
  export function handle(request: OutgoingRequest, options: RequestOptions | undefined): FutureIncomingResponse;
}
import type { OutgoingRequest } from '../interfaces/wasi-http-types.js';
export { OutgoingRequest };
import type { RequestOptions } from '../interfaces/wasi-http-types.js';
export { RequestOptions };
import type { FutureIncomingResponse } from '../interfaces/wasi-http-types.js';
export { FutureIncomingResponse };
import type { ErrorCode } from '../interfaces/wasi-http-types.js';
export { ErrorCode };
