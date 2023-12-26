This is a quick test of the version to version stability of [wasmtime-py](https://pypi.org/project/wasmtime/) and [jco](https://www.npmjs.com/package/@bytecodealliance/jco). This is achieved by taking a single wit definition, building its bindings with each version of the dependencies, and then running simple tests against them to confirm that there are not practical changes.

## JCO

`jco` is tested from version 12 forward (12 is the first version to support `wit`'s `resource` types). The Rust implementing the wasm can be found in the `runtime/` directory.

These tests can be run by executing the following commands:

```
npm install && \
npm run build && \
npx tsx ./jcoVersionTest.ts
```

## Wasmtime-py

`wasmtime-py` is tested from version 12 forward, but since no versions yet support `resource` types it is tested against the Rust code from `runtime-no-resources/`

These tests can be run by executing the following commands:

```
npm install && \
npm run build-no-resources && \
npx tsx ./wasmtimeVersionTest.ts
```
