export namespace WasiIoStreams020rc20231110 {
  export { OutputStream };
}
import type { Error } from '../interfaces/wasi-io-error-0.2.0-rc-2023-11-10';
export { Error };
export type StreamError = StreamErrorLastOperationFailed | StreamErrorClosed;
export interface StreamErrorLastOperationFailed {
  tag: 'last-operation-failed',
  val: Error,
}
export interface StreamErrorClosed {
  tag: 'closed',
}

export class OutputStream {
  checkWrite(): bigint;
  write(contents: Uint8Array): void;
  blockingWriteAndFlush(contents: Uint8Array): void;
  blockingFlush(): void;
}
