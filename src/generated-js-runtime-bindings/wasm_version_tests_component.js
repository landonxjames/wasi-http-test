const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

const instantiateCore = WebAssembly.instantiate;

const resourceHandleSymbol = Symbol();

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen + s.length);
    allocLen += s.length;
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  if (allocLen > writtenTotal)
  ptr = realloc(ptr, allocLen, 1, writtenTotal);
  utf8EncodedLen = writtenTotal;
  return ptr;
}

let exports0;
let exports1;
let exports2;
let memory0;
let postReturn0;
let realloc0;
let postReturn1;
const handleTable0= new Map();
let handleCnt0 = 0;
const finalizationRegistry0= new FinalizationRegistry(handle => {
  const handleEntry = handleTable0.get(handle);
  if (handleEntry) {
    handleTable0.delete(handle);
    if (handleEntry.own) {
      exports0['0'](handleEntry.rep);
    }
  }
});

function trampoline0(rep) {
  const handle = handleCnt0++;
  handleTable0.set(handle, { rep, own: true });
  return handle;
}
const handleTable1= new Map();
let handleCnt1 = 0;
const finalizationRegistry1= new FinalizationRegistry(handle => {
  const handleEntry = handleTable1.get(handle);
  if (handleEntry) {
    handleTable1.delete(handle);
    if (handleEntry.own) {
      exports0['1'](handleEntry.rep);
    }
  }
});

function trampoline1(rep) {
  const handle = handleCnt1++;
  handleTable1.set(handle, { rep, own: true });
  return handle;
}

class WasmVersionTestsClient{
  constructor() {
    const ret = exports1['wasm-version-tests:component/clients#[constructor]wasm-version-tests-client']();
    const rsc0 = new.target === WasmVersionTestsClient ? this : Object.create(WasmVersionTestsClient.prototype);
    Object.defineProperty(rsc0, resourceHandleSymbol, { writable: true, value: handleTable0.get(ret).rep });
    handleTable0.delete(ret);
    finalizationRegistry0.register(rsc0, ret, rsc0);
    return rsc0;
  }
}

WasmVersionTestsClient.prototype.helloWorld = function helloWorld() {
  let handle0 = this[resourceHandleSymbol];
  if (handle0=== null) {
    throw new Error('"WasmVersionTestsClient" resource handle lifetime expired / transferred.');
  }
  if (handle0=== undefined) {
    throw new Error('Not a valid "WasmVersionTestsClient" resource.');
  }
  
  const ret = exports1['wasm-version-tests:component/clients#[method]wasm-version-tests-client.hello-world'](handle0);
  const ptr1 = dataView(memory0).getInt32(ret + 0, true);
  const len1 = dataView(memory0).getInt32(ret + 4, true);
  const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
  postReturn0(ret);
  return result1;
};

class WasmVersionTestsEvent{
  constructor() {
    const ret = exports1['wasm-version-tests:component/events#[constructor]wasm-version-tests-event']();
    const rsc0 = new.target === WasmVersionTestsEvent ? this : Object.create(WasmVersionTestsEvent.prototype);
    Object.defineProperty(rsc0, resourceHandleSymbol, { writable: true, value: handleTable1.get(ret).rep });
    handleTable1.delete(ret);
    finalizationRegistry1.register(rsc0, ret, rsc0);
    return rsc0;
  }
}

WasmVersionTestsEvent.prototype.parse = function parse(arg1) {
  let handle0 = this[resourceHandleSymbol];
  if (handle0=== null) {
    throw new Error('"WasmVersionTestsEvent" resource handle lifetime expired / transferred.');
  }
  if (handle0=== undefined) {
    throw new Error('Not a valid "WasmVersionTestsEvent" resource.');
  }
  
  const ptr1 = utf8Encode(arg1, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const ret = exports1['wasm-version-tests:component/events#[method]wasm-version-tests-event.parse'](handle0, ptr1, len1);
  let variant4;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const ptr2 = dataView(memory0).getInt32(ret + 4, true);
      const len2 = dataView(memory0).getInt32(ret + 8, true);
      const result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
      variant4= {
        tag: 'ok',
        val: {
          bar: result2,
        }
      };
      break;
    }
    case 1: {
      const ptr3 = dataView(memory0).getInt32(ret + 4, true);
      const len3 = dataView(memory0).getInt32(ret + 8, true);
      const result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
      variant4= {
        tag: 'err',
        val: result3
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn1(ret);
  if (variant4.tag === 'err') {
    throw new ComponentError(variant4.val);
  }
  return variant4.val;
};

const $init = (async() => {
  const module0 = fetchCompile(new URL('./wasm_version_tests_component.core.wasm', import.meta.url));
  const module1 = base64Compile('AGFzbQEAAAABBQFgAX8AAwMCAAAEBQFwAQICBxQDATAAAAExAAEIJGltcG9ydHMBAAoVAgkAIABBABEAAAsJACAAQQERAAALAC4JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQGMC4xOC4wALYBBG5hbWUAExJ3aXQtY29tcG9uZW50OnNoaW0BmQECAEtkdG9yLVtleHBvcnRdd2FzbS12ZXJzaW9uLXRlc3RzOmNvbXBvbmVudC9jbGllbnRzLXdhc20tdmVyc2lvbi10ZXN0cy1jbGllbnQBSWR0b3ItW2V4cG9ydF13YXNtLXZlcnNpb24tdGVzdHM6Y29tcG9uZW50L2V2ZW50cy13YXNtLXZlcnNpb24tdGVzdHMtZXZlbnQ');
  const module2 = base64Compile('AGFzbQEAAAABBQFgAX8AAhoDAAEwAAAAATEAAAAIJGltcG9ydHMBcAECAgkIAQBBAAsCAAEALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjE4LjAAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
  const instanceFlags0 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  const instanceFlags1 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  const instanceFlags2 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  Promise.all([module0, module1, module2]).catch(() => {});
  ({ exports: exports0 } = await instantiateCore(await module1));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    '[export]wasm-version-tests:component/clients': {
      '[resource-new]wasm-version-tests-client': trampoline0,
    },
    '[export]wasm-version-tests:component/events': {
      '[resource-new]wasm-version-tests-event': trampoline1,
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module2, {
    '': {
      $imports: exports0.$imports,
      '0': exports1['wasm-version-tests:component/clients#[dtor]wasm-version-tests-client'],
      '1': exports1['wasm-version-tests:component/clients#[dtor]wasm-version-tests-client'],
    },
  }));
  memory0 = exports1.memory;
  postReturn0 = exports1['cabi_post_wasm-version-tests:component/clients#[method]wasm-version-tests-client.hello-world'];
  realloc0 = exports1.cabi_realloc;
  postReturn1 = exports1['cabi_post_wasm-version-tests:component/events#[method]wasm-version-tests-event.parse'];
})();

await $init;
const clients = {
  WasmVersionTestsClient: WasmVersionTestsClient,
  
};
const events = {
  WasmVersionTestsEvent: WasmVersionTestsEvent,
  
};

export { clients, events, clients as 'wasm-version-tests:component/clients', events as 'wasm-version-tests:component/events' }