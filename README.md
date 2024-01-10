This is a quick proof of concept getting the `wasi:http` functionality working.

The main things required to get this to work:

- Save the `wasi_snapshot_preview1.reactor.wasm` binary into the `runtime/` dir and then use it with the `--adapt` param of `wasm-tools component new` to include the wasi preview1 functionality into my binary. The pre-build binary was sourced from [a tagged wasmtime release (16.0.0).](https://github.com/bytecodealliance/wasmtime/releases/tag/v16.0.0)
- Include all necessary `wasi:*` wit files in the `runtime/wit/deps` directory. These were sourced from the [`wasi-http` GH repo](https://github.com/WebAssembly/wasi-http) and the `wasi:http` specific ones had `package wasi:http@0.2.0-rc-2023-12-05;` added at the top of each to make them easily referenceable.
- We add a `import wasi:http/outgoing-handler@0.2.0-rc-2023-12-05;` statement to the world so that the Rust parts of the `wasi:http` library are generated and we can reference them like:

```rust
use wasi::http::outgoing_handler::handle;
use wasi::http::types::{
    ErrorCode, Fields, FutureIncomingResponse, IncomingBody, IncomingResponse, OutgoingRequest,
    RequestOptions, Scheme,
};
```

- We then use the `wasi:http` library to construct an `OutgoingRequest`, send it, block the thread awaiting the response using a `Pollable` subscribed to via the `FutureIncomingResponse`, and then parse out the body of the response.
