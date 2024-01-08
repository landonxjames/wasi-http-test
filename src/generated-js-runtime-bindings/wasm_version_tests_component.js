import { environment, exit as exit$1, stderr, stdin, stdout } from '@bytecodealliance/preview2-shim/cli';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { outgoingHandler, types as types$1 } from '@bytecodealliance/preview2-shim/http';
import { error, poll, streams } from '@bytecodealliance/preview2-shim/io';
const { getEnvironment } = environment;
const { exit } = exit$1;
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { getDirectories } = preopens;
const { Descriptor,
  filesystemErrorCode } = types;
const { handle } = outgoingHandler;
const { Fields,
  FutureIncomingResponse,
  IncomingResponse,
  OutgoingRequest,
  RequestOptions } = types$1;
const { Error: Error$1 } = error;
const { Pollable } = poll;
const { InputStream,
  OutputStream } = streams;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

function clampGuest(i, min, max) {
  if (i < min || i > max) throw new TypeError(`must be between ${min} and ${max}`);
  return i;
}

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const emptyFunc = () => {};

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  return e;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const resourceHandleSymbol = Symbol('resource');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

const toUint64 = val => BigInt.asUintN(64, BigInt(val));

function toUint16(val) {
  val >>>= 0;
  val %= 2 ** 16;
  return val;
}

function toUint32(val) {
  return val >>> 0;
}

function toUint8(val) {
  val >>>= 0;
  val %= 2 ** 8;
  return val;
}

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
    ptr = realloc(ptr, allocLen, 1, allocLen += s.length * 2);
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  utf8EncodedLen = writtenTotal;
  return ptr;
}

let exports0;

function trampoline0(arg0) {
  var handle1 = arg0;
  var rsc0 = handleTable4.get(handle1).rep;
  handleTable4.delete(handle1);
  const ret = new OutgoingRequest(rsc0);
  if (!(ret instanceof OutgoingRequest)) {
    throw new Error('Resource error: Not a valid "OutgoingRequest" resource.');
  }
  var handle2 = handleCnt5++;
  handleTable5.set(handle2, { rep: ret, own: true });
  return handle2;
}

function trampoline1(arg0) {
  var handle1 = arg0;
  var rsc0 = handleTable6.get(handle1).rep;
  const ret = FutureIncomingResponse.prototype.subscribe.call(rsc0);
  if (!(ret instanceof Pollable)) {
    throw new Error('Resource error: Not a valid "Pollable" resource.');
  }
  var handle2 = handleCnt0++;
  handleTable0.set(handle2, { rep: ret, own: true });
  return handle2;
}

function trampoline3(arg0) {
  var handle1 = arg0;
  var rsc0 = handleTable0.get(handle1).rep;
  Pollable.prototype.block.call(rsc0);
}

function trampoline4(arg0) {
  var handle1 = arg0;
  var rsc0 = handleTable0.get(handle1).rep;
  const ret = Pollable.prototype.ready.call(rsc0);
  return ret ? 1 : 0;
}
let exports1;

function trampoline12() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new Error('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = handleCnt2++;
  handleTable2.set(handle0, { rep: ret, own: true });
  return handle0;
}

function trampoline13(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}

function trampoline14() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new Error('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = handleCnt3++;
  handleTable3.set(handle0, { rep: ret, own: true });
  return handle0;
}

function trampoline15() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new Error('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = handleCnt2++;
  handleTable2.set(handle0, { rep: ret, own: true });
  return handle0;
}
let exports2;

function trampoline16(arg0, arg1, arg2) {
  var len2 = arg1;
  var base2 = arg0;
  var result2 = [];
  for (let i = 0; i < len2; i++) {
    const base = base2 + i * 16;
    var ptr0 = dataView(memory0).getInt32(base + 0, true);
    var len0 = dataView(memory0).getInt32(base + 4, true);
    var result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
    var ptr1 = dataView(memory0).getInt32(base + 8, true);
    var len1 = dataView(memory0).getInt32(base + 12, true);
    var result1 = new Uint8Array(memory0.buffer.slice(ptr1, ptr1 + len1 * 1));
    result2.push([result0, result1]);
  }
  let ret;
  try {
    ret = { tag: 'ok', val: Fields.fromList(result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof Fields)) {
        throw new Error('Resource error: Not a valid "Fields" resource.');
      }
      var handle3 = handleCnt4++;
      handleTable4.set(handle3, { rep: e, own: true });
      dataView(memory0).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'invalid-syntax': {
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          break;
        }
        case 'forbidden': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        case 'immutable': {
          dataView(memory0).setInt8(arg2 + 4, 2, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`HeaderError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
let memory0;

function trampoline17(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable5.get(handle1).rep;
  const ret = OutgoingRequest.prototype.pathWithQuery.call(rsc0);
  var variant3 = ret;
  if (variant3 === null || variant3=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var ptr2 = utf8Encode(e, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(arg1 + 8, len2, true);
    dataView(memory0).setInt32(arg1 + 4, ptr2, true);
  }
}
let realloc0;

function trampoline18(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable5.get(handle1).rep;
  let variant3;
  switch (arg1) {
    case 0: {
      variant3 = undefined;
      break;
    }
    case 1: {
      var ptr2 = arg2;
      var len2 = arg3;
      var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
      variant3 = result2;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: OutgoingRequest.prototype.setPathWithQuery.call(rsc0, variant3) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  let variant4_0;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      variant4_0 = 0;
      break;
    }
    case 'err': {
      const e = variant4.val;
      variant4_0 = 1;
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
  return variant4_0;
}

function trampoline19(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable5.get(handle1).rep;
  const ret = OutgoingRequest.prototype.scheme.call(rsc0);
  var variant4 = ret;
  if (variant4 === null || variant4=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var variant3 = e;
    switch (variant3.tag) {
      case 'HTTP': {
        dataView(memory0).setInt8(arg1 + 4, 0, true);
        break;
      }
      case 'HTTPS': {
        dataView(memory0).setInt8(arg1 + 4, 1, true);
        break;
      }
      case 'other': {
        const e = variant3.val;
        dataView(memory0).setInt8(arg1 + 4, 2, true);
        var ptr2 = utf8Encode(e, realloc0, memory0);
        var len2 = utf8EncodedLen;
        dataView(memory0).setInt32(arg1 + 12, len2, true);
        dataView(memory0).setInt32(arg1 + 8, ptr2, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`Scheme\``);
      }
    }
  }
}

function trampoline20(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rsc0 = handleTable5.get(handle1).rep;
  let variant4;
  switch (arg1) {
    case 0: {
      variant4 = undefined;
      break;
    }
    case 1: {
      let variant3;
      switch (arg2) {
        case 0: {
          variant3= {
            tag: 'HTTP',
          };
          break;
        }
        case 1: {
          variant3= {
            tag: 'HTTPS',
          };
          break;
        }
        case 2: {
          var ptr2 = arg3;
          var len2 = arg4;
          var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
          variant3= {
            tag: 'other',
            val: result2
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Scheme');
        }
      }
      variant4 = variant3;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: OutgoingRequest.prototype.setScheme.call(rsc0, variant4) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  let variant5_0;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      variant5_0 = 0;
      break;
    }
    case 'err': {
      const e = variant5.val;
      variant5_0 = 1;
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
  return variant5_0;
}

function trampoline21(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable5.get(handle1).rep;
  const ret = OutgoingRequest.prototype.authority.call(rsc0);
  var variant3 = ret;
  if (variant3 === null || variant3=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var ptr2 = utf8Encode(e, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(arg1 + 8, len2, true);
    dataView(memory0).setInt32(arg1 + 4, ptr2, true);
  }
}

function trampoline22(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable5.get(handle1).rep;
  let variant3;
  switch (arg1) {
    case 0: {
      variant3 = undefined;
      break;
    }
    case 1: {
      var ptr2 = arg2;
      var len2 = arg3;
      var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
      variant3 = result2;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: OutgoingRequest.prototype.setAuthority.call(rsc0, variant3) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  let variant4_0;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      variant4_0 = 0;
      break;
    }
    case 'err': {
      const e = variant4.val;
      variant4_0 = 1;
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
  return variant4_0;
}

function trampoline23(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable6.get(handle1).rep;
  const ret = FutureIncomingResponse.prototype.get.call(rsc0);
  var variant43 = ret;
  if (variant43 === null || variant43=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant43;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var variant42 = e;
    switch (variant42.tag) {
      case 'ok': {
        const e = variant42.val;
        dataView(memory0).setInt8(arg1 + 8, 0, true);
        var variant41 = e;
        switch (variant41.tag) {
          case 'ok': {
            const e = variant41.val;
            dataView(memory0).setInt8(arg1 + 16, 0, true);
            if (!(e instanceof IncomingResponse)) {
              throw new Error('Resource error: Not a valid "IncomingResponse" resource.');
            }
            var handle2 = handleCnt7++;
            handleTable7.set(handle2, { rep: e, own: true });
            dataView(memory0).setInt32(arg1 + 24, handle2, true);
            break;
          }
          case 'err': {
            const e = variant41.val;
            dataView(memory0).setInt8(arg1 + 16, 1, true);
            var variant40 = e;
            switch (variant40.tag) {
              case 'DNS-timeout': {
                dataView(memory0).setInt8(arg1 + 24, 0, true);
                break;
              }
              case 'DNS-error': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 1, true);
                var {rcode: v3_0, infoCode: v3_1 } = e;
                var variant5 = v3_0;
                if (variant5 === null || variant5=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant5;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  var ptr4 = utf8Encode(e, realloc0, memory0);
                  var len4 = utf8EncodedLen;
                  dataView(memory0).setInt32(arg1 + 40, len4, true);
                  dataView(memory0).setInt32(arg1 + 36, ptr4, true);
                }
                var variant6 = v3_1;
                if (variant6 === null || variant6=== undefined) {
                  dataView(memory0).setInt8(arg1 + 44, 0, true);
                } else {
                  const e = variant6;
                  dataView(memory0).setInt8(arg1 + 44, 1, true);
                  dataView(memory0).setInt16(arg1 + 46, toUint16(e), true);
                }
                break;
              }
              case 'destination-not-found': {
                dataView(memory0).setInt8(arg1 + 24, 2, true);
                break;
              }
              case 'destination-unavailable': {
                dataView(memory0).setInt8(arg1 + 24, 3, true);
                break;
              }
              case 'destination-IP-prohibited': {
                dataView(memory0).setInt8(arg1 + 24, 4, true);
                break;
              }
              case 'destination-IP-unroutable': {
                dataView(memory0).setInt8(arg1 + 24, 5, true);
                break;
              }
              case 'connection-refused': {
                dataView(memory0).setInt8(arg1 + 24, 6, true);
                break;
              }
              case 'connection-terminated': {
                dataView(memory0).setInt8(arg1 + 24, 7, true);
                break;
              }
              case 'connection-timeout': {
                dataView(memory0).setInt8(arg1 + 24, 8, true);
                break;
              }
              case 'connection-read-timeout': {
                dataView(memory0).setInt8(arg1 + 24, 9, true);
                break;
              }
              case 'connection-write-timeout': {
                dataView(memory0).setInt8(arg1 + 24, 10, true);
                break;
              }
              case 'connection-limit-reached': {
                dataView(memory0).setInt8(arg1 + 24, 11, true);
                break;
              }
              case 'TLS-protocol-error': {
                dataView(memory0).setInt8(arg1 + 24, 12, true);
                break;
              }
              case 'TLS-certificate-error': {
                dataView(memory0).setInt8(arg1 + 24, 13, true);
                break;
              }
              case 'TLS-alert-received': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 14, true);
                var {alertId: v7_0, alertMessage: v7_1 } = e;
                var variant8 = v7_0;
                if (variant8 === null || variant8=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant8;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setInt8(arg1 + 33, toUint8(e), true);
                }
                var variant10 = v7_1;
                if (variant10 === null || variant10=== undefined) {
                  dataView(memory0).setInt8(arg1 + 36, 0, true);
                } else {
                  const e = variant10;
                  dataView(memory0).setInt8(arg1 + 36, 1, true);
                  var ptr9 = utf8Encode(e, realloc0, memory0);
                  var len9 = utf8EncodedLen;
                  dataView(memory0).setInt32(arg1 + 44, len9, true);
                  dataView(memory0).setInt32(arg1 + 40, ptr9, true);
                }
                break;
              }
              case 'HTTP-request-denied': {
                dataView(memory0).setInt8(arg1 + 24, 15, true);
                break;
              }
              case 'HTTP-request-length-required': {
                dataView(memory0).setInt8(arg1 + 24, 16, true);
                break;
              }
              case 'HTTP-request-body-size': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 17, true);
                var variant11 = e;
                if (variant11 === null || variant11=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant11;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setBigInt64(arg1 + 40, toUint64(e), true);
                }
                break;
              }
              case 'HTTP-request-method-invalid': {
                dataView(memory0).setInt8(arg1 + 24, 18, true);
                break;
              }
              case 'HTTP-request-URI-invalid': {
                dataView(memory0).setInt8(arg1 + 24, 19, true);
                break;
              }
              case 'HTTP-request-URI-too-long': {
                dataView(memory0).setInt8(arg1 + 24, 20, true);
                break;
              }
              case 'HTTP-request-header-section-size': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 21, true);
                var variant12 = e;
                if (variant12 === null || variant12=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant12;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setInt32(arg1 + 36, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-request-header-size': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 22, true);
                var variant17 = e;
                if (variant17 === null || variant17=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant17;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  var {fieldName: v13_0, fieldSize: v13_1 } = e;
                  var variant15 = v13_0;
                  if (variant15 === null || variant15=== undefined) {
                    dataView(memory0).setInt8(arg1 + 36, 0, true);
                  } else {
                    const e = variant15;
                    dataView(memory0).setInt8(arg1 + 36, 1, true);
                    var ptr14 = utf8Encode(e, realloc0, memory0);
                    var len14 = utf8EncodedLen;
                    dataView(memory0).setInt32(arg1 + 44, len14, true);
                    dataView(memory0).setInt32(arg1 + 40, ptr14, true);
                  }
                  var variant16 = v13_1;
                  if (variant16 === null || variant16=== undefined) {
                    dataView(memory0).setInt8(arg1 + 48, 0, true);
                  } else {
                    const e = variant16;
                    dataView(memory0).setInt8(arg1 + 48, 1, true);
                    dataView(memory0).setInt32(arg1 + 52, toUint32(e), true);
                  }
                }
                break;
              }
              case 'HTTP-request-trailer-section-size': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 23, true);
                var variant18 = e;
                if (variant18 === null || variant18=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant18;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setInt32(arg1 + 36, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-request-trailer-size': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 24, true);
                var {fieldName: v19_0, fieldSize: v19_1 } = e;
                var variant21 = v19_0;
                if (variant21 === null || variant21=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant21;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  var ptr20 = utf8Encode(e, realloc0, memory0);
                  var len20 = utf8EncodedLen;
                  dataView(memory0).setInt32(arg1 + 40, len20, true);
                  dataView(memory0).setInt32(arg1 + 36, ptr20, true);
                }
                var variant22 = v19_1;
                if (variant22 === null || variant22=== undefined) {
                  dataView(memory0).setInt8(arg1 + 44, 0, true);
                } else {
                  const e = variant22;
                  dataView(memory0).setInt8(arg1 + 44, 1, true);
                  dataView(memory0).setInt32(arg1 + 48, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-response-incomplete': {
                dataView(memory0).setInt8(arg1 + 24, 25, true);
                break;
              }
              case 'HTTP-response-header-section-size': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 26, true);
                var variant23 = e;
                if (variant23 === null || variant23=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant23;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setInt32(arg1 + 36, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-response-header-size': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 27, true);
                var {fieldName: v24_0, fieldSize: v24_1 } = e;
                var variant26 = v24_0;
                if (variant26 === null || variant26=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant26;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  var ptr25 = utf8Encode(e, realloc0, memory0);
                  var len25 = utf8EncodedLen;
                  dataView(memory0).setInt32(arg1 + 40, len25, true);
                  dataView(memory0).setInt32(arg1 + 36, ptr25, true);
                }
                var variant27 = v24_1;
                if (variant27 === null || variant27=== undefined) {
                  dataView(memory0).setInt8(arg1 + 44, 0, true);
                } else {
                  const e = variant27;
                  dataView(memory0).setInt8(arg1 + 44, 1, true);
                  dataView(memory0).setInt32(arg1 + 48, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-response-body-size': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 28, true);
                var variant28 = e;
                if (variant28 === null || variant28=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant28;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setBigInt64(arg1 + 40, toUint64(e), true);
                }
                break;
              }
              case 'HTTP-response-trailer-section-size': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 29, true);
                var variant29 = e;
                if (variant29 === null || variant29=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant29;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  dataView(memory0).setInt32(arg1 + 36, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-response-trailer-size': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 30, true);
                var {fieldName: v30_0, fieldSize: v30_1 } = e;
                var variant32 = v30_0;
                if (variant32 === null || variant32=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant32;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  var ptr31 = utf8Encode(e, realloc0, memory0);
                  var len31 = utf8EncodedLen;
                  dataView(memory0).setInt32(arg1 + 40, len31, true);
                  dataView(memory0).setInt32(arg1 + 36, ptr31, true);
                }
                var variant33 = v30_1;
                if (variant33 === null || variant33=== undefined) {
                  dataView(memory0).setInt8(arg1 + 44, 0, true);
                } else {
                  const e = variant33;
                  dataView(memory0).setInt8(arg1 + 44, 1, true);
                  dataView(memory0).setInt32(arg1 + 48, toUint32(e), true);
                }
                break;
              }
              case 'HTTP-response-transfer-coding': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 31, true);
                var variant35 = e;
                if (variant35 === null || variant35=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant35;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  var ptr34 = utf8Encode(e, realloc0, memory0);
                  var len34 = utf8EncodedLen;
                  dataView(memory0).setInt32(arg1 + 40, len34, true);
                  dataView(memory0).setInt32(arg1 + 36, ptr34, true);
                }
                break;
              }
              case 'HTTP-response-content-coding': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 32, true);
                var variant37 = e;
                if (variant37 === null || variant37=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant37;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  var ptr36 = utf8Encode(e, realloc0, memory0);
                  var len36 = utf8EncodedLen;
                  dataView(memory0).setInt32(arg1 + 40, len36, true);
                  dataView(memory0).setInt32(arg1 + 36, ptr36, true);
                }
                break;
              }
              case 'HTTP-response-timeout': {
                dataView(memory0).setInt8(arg1 + 24, 33, true);
                break;
              }
              case 'HTTP-upgrade-failed': {
                dataView(memory0).setInt8(arg1 + 24, 34, true);
                break;
              }
              case 'HTTP-protocol-error': {
                dataView(memory0).setInt8(arg1 + 24, 35, true);
                break;
              }
              case 'loop-detected': {
                dataView(memory0).setInt8(arg1 + 24, 36, true);
                break;
              }
              case 'configuration-error': {
                dataView(memory0).setInt8(arg1 + 24, 37, true);
                break;
              }
              case 'internal-error': {
                const e = variant40.val;
                dataView(memory0).setInt8(arg1 + 24, 38, true);
                var variant39 = e;
                if (variant39 === null || variant39=== undefined) {
                  dataView(memory0).setInt8(arg1 + 32, 0, true);
                } else {
                  const e = variant39;
                  dataView(memory0).setInt8(arg1 + 32, 1, true);
                  var ptr38 = utf8Encode(e, realloc0, memory0);
                  var len38 = utf8EncodedLen;
                  dataView(memory0).setInt32(arg1 + 40, len38, true);
                  dataView(memory0).setInt32(arg1 + 36, ptr38, true);
                }
                break;
              }
              default: {
                throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant40.tag)}\` (received \`${variant40}\`) specified for \`ErrorCode\``);
              }
            }
            break;
          }
          default: {
            throw new TypeError('invalid variant specified for result');
          }
        }
        break;
      }
      case 'err': {
        const e = variant42.val;
        dataView(memory0).setInt8(arg1 + 8, 1, true);
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
}

function trampoline24(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable5.get(handle1).rep;
  handleTable5.delete(handle1);
  let variant4;
  switch (arg1) {
    case 0: {
      variant4 = undefined;
      break;
    }
    case 1: {
      var handle3 = arg2;
      var rsc2 = handleTable8.get(handle3).rep;
      handleTable8.delete(handle3);
      variant4 = rsc2;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: handle(rsc0, variant4) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant44 = ret;
  switch (variant44.tag) {
    case 'ok': {
      const e = variant44.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      if (!(e instanceof FutureIncomingResponse)) {
        throw new Error('Resource error: Not a valid "FutureIncomingResponse" resource.');
      }
      var handle5 = handleCnt6++;
      handleTable6.set(handle5, { rep: e, own: true });
      dataView(memory0).setInt32(arg3 + 8, handle5, true);
      break;
    }
    case 'err': {
      const e = variant44.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant43 = e;
      switch (variant43.tag) {
        case 'DNS-timeout': {
          dataView(memory0).setInt8(arg3 + 8, 0, true);
          break;
        }
        case 'DNS-error': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 1, true);
          var {rcode: v6_0, infoCode: v6_1 } = e;
          var variant8 = v6_0;
          if (variant8 === null || variant8=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant8;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var ptr7 = utf8Encode(e, realloc0, memory0);
            var len7 = utf8EncodedLen;
            dataView(memory0).setInt32(arg3 + 24, len7, true);
            dataView(memory0).setInt32(arg3 + 20, ptr7, true);
          }
          var variant9 = v6_1;
          if (variant9 === null || variant9=== undefined) {
            dataView(memory0).setInt8(arg3 + 28, 0, true);
          } else {
            const e = variant9;
            dataView(memory0).setInt8(arg3 + 28, 1, true);
            dataView(memory0).setInt16(arg3 + 30, toUint16(e), true);
          }
          break;
        }
        case 'destination-not-found': {
          dataView(memory0).setInt8(arg3 + 8, 2, true);
          break;
        }
        case 'destination-unavailable': {
          dataView(memory0).setInt8(arg3 + 8, 3, true);
          break;
        }
        case 'destination-IP-prohibited': {
          dataView(memory0).setInt8(arg3 + 8, 4, true);
          break;
        }
        case 'destination-IP-unroutable': {
          dataView(memory0).setInt8(arg3 + 8, 5, true);
          break;
        }
        case 'connection-refused': {
          dataView(memory0).setInt8(arg3 + 8, 6, true);
          break;
        }
        case 'connection-terminated': {
          dataView(memory0).setInt8(arg3 + 8, 7, true);
          break;
        }
        case 'connection-timeout': {
          dataView(memory0).setInt8(arg3 + 8, 8, true);
          break;
        }
        case 'connection-read-timeout': {
          dataView(memory0).setInt8(arg3 + 8, 9, true);
          break;
        }
        case 'connection-write-timeout': {
          dataView(memory0).setInt8(arg3 + 8, 10, true);
          break;
        }
        case 'connection-limit-reached': {
          dataView(memory0).setInt8(arg3 + 8, 11, true);
          break;
        }
        case 'TLS-protocol-error': {
          dataView(memory0).setInt8(arg3 + 8, 12, true);
          break;
        }
        case 'TLS-certificate-error': {
          dataView(memory0).setInt8(arg3 + 8, 13, true);
          break;
        }
        case 'TLS-alert-received': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 14, true);
          var {alertId: v10_0, alertMessage: v10_1 } = e;
          var variant11 = v10_0;
          if (variant11 === null || variant11=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant11;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setInt8(arg3 + 17, toUint8(e), true);
          }
          var variant13 = v10_1;
          if (variant13 === null || variant13=== undefined) {
            dataView(memory0).setInt8(arg3 + 20, 0, true);
          } else {
            const e = variant13;
            dataView(memory0).setInt8(arg3 + 20, 1, true);
            var ptr12 = utf8Encode(e, realloc0, memory0);
            var len12 = utf8EncodedLen;
            dataView(memory0).setInt32(arg3 + 28, len12, true);
            dataView(memory0).setInt32(arg3 + 24, ptr12, true);
          }
          break;
        }
        case 'HTTP-request-denied': {
          dataView(memory0).setInt8(arg3 + 8, 15, true);
          break;
        }
        case 'HTTP-request-length-required': {
          dataView(memory0).setInt8(arg3 + 8, 16, true);
          break;
        }
        case 'HTTP-request-body-size': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 17, true);
          var variant14 = e;
          if (variant14 === null || variant14=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant14;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setBigInt64(arg3 + 24, toUint64(e), true);
          }
          break;
        }
        case 'HTTP-request-method-invalid': {
          dataView(memory0).setInt8(arg3 + 8, 18, true);
          break;
        }
        case 'HTTP-request-URI-invalid': {
          dataView(memory0).setInt8(arg3 + 8, 19, true);
          break;
        }
        case 'HTTP-request-URI-too-long': {
          dataView(memory0).setInt8(arg3 + 8, 20, true);
          break;
        }
        case 'HTTP-request-header-section-size': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 21, true);
          var variant15 = e;
          if (variant15 === null || variant15=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant15;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
          }
          break;
        }
        case 'HTTP-request-header-size': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 22, true);
          var variant20 = e;
          if (variant20 === null || variant20=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant20;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var {fieldName: v16_0, fieldSize: v16_1 } = e;
            var variant18 = v16_0;
            if (variant18 === null || variant18=== undefined) {
              dataView(memory0).setInt8(arg3 + 20, 0, true);
            } else {
              const e = variant18;
              dataView(memory0).setInt8(arg3 + 20, 1, true);
              var ptr17 = utf8Encode(e, realloc0, memory0);
              var len17 = utf8EncodedLen;
              dataView(memory0).setInt32(arg3 + 28, len17, true);
              dataView(memory0).setInt32(arg3 + 24, ptr17, true);
            }
            var variant19 = v16_1;
            if (variant19 === null || variant19=== undefined) {
              dataView(memory0).setInt8(arg3 + 32, 0, true);
            } else {
              const e = variant19;
              dataView(memory0).setInt8(arg3 + 32, 1, true);
              dataView(memory0).setInt32(arg3 + 36, toUint32(e), true);
            }
          }
          break;
        }
        case 'HTTP-request-trailer-section-size': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 23, true);
          var variant21 = e;
          if (variant21 === null || variant21=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant21;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
          }
          break;
        }
        case 'HTTP-request-trailer-size': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 24, true);
          var {fieldName: v22_0, fieldSize: v22_1 } = e;
          var variant24 = v22_0;
          if (variant24 === null || variant24=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant24;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var ptr23 = utf8Encode(e, realloc0, memory0);
            var len23 = utf8EncodedLen;
            dataView(memory0).setInt32(arg3 + 24, len23, true);
            dataView(memory0).setInt32(arg3 + 20, ptr23, true);
          }
          var variant25 = v22_1;
          if (variant25 === null || variant25=== undefined) {
            dataView(memory0).setInt8(arg3 + 28, 0, true);
          } else {
            const e = variant25;
            dataView(memory0).setInt8(arg3 + 28, 1, true);
            dataView(memory0).setInt32(arg3 + 32, toUint32(e), true);
          }
          break;
        }
        case 'HTTP-response-incomplete': {
          dataView(memory0).setInt8(arg3 + 8, 25, true);
          break;
        }
        case 'HTTP-response-header-section-size': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 26, true);
          var variant26 = e;
          if (variant26 === null || variant26=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant26;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
          }
          break;
        }
        case 'HTTP-response-header-size': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 27, true);
          var {fieldName: v27_0, fieldSize: v27_1 } = e;
          var variant29 = v27_0;
          if (variant29 === null || variant29=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant29;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var ptr28 = utf8Encode(e, realloc0, memory0);
            var len28 = utf8EncodedLen;
            dataView(memory0).setInt32(arg3 + 24, len28, true);
            dataView(memory0).setInt32(arg3 + 20, ptr28, true);
          }
          var variant30 = v27_1;
          if (variant30 === null || variant30=== undefined) {
            dataView(memory0).setInt8(arg3 + 28, 0, true);
          } else {
            const e = variant30;
            dataView(memory0).setInt8(arg3 + 28, 1, true);
            dataView(memory0).setInt32(arg3 + 32, toUint32(e), true);
          }
          break;
        }
        case 'HTTP-response-body-size': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 28, true);
          var variant31 = e;
          if (variant31 === null || variant31=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant31;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setBigInt64(arg3 + 24, toUint64(e), true);
          }
          break;
        }
        case 'HTTP-response-trailer-section-size': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 29, true);
          var variant32 = e;
          if (variant32 === null || variant32=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant32;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setInt32(arg3 + 20, toUint32(e), true);
          }
          break;
        }
        case 'HTTP-response-trailer-size': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 30, true);
          var {fieldName: v33_0, fieldSize: v33_1 } = e;
          var variant35 = v33_0;
          if (variant35 === null || variant35=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant35;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var ptr34 = utf8Encode(e, realloc0, memory0);
            var len34 = utf8EncodedLen;
            dataView(memory0).setInt32(arg3 + 24, len34, true);
            dataView(memory0).setInt32(arg3 + 20, ptr34, true);
          }
          var variant36 = v33_1;
          if (variant36 === null || variant36=== undefined) {
            dataView(memory0).setInt8(arg3 + 28, 0, true);
          } else {
            const e = variant36;
            dataView(memory0).setInt8(arg3 + 28, 1, true);
            dataView(memory0).setInt32(arg3 + 32, toUint32(e), true);
          }
          break;
        }
        case 'HTTP-response-transfer-coding': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 31, true);
          var variant38 = e;
          if (variant38 === null || variant38=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant38;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var ptr37 = utf8Encode(e, realloc0, memory0);
            var len37 = utf8EncodedLen;
            dataView(memory0).setInt32(arg3 + 24, len37, true);
            dataView(memory0).setInt32(arg3 + 20, ptr37, true);
          }
          break;
        }
        case 'HTTP-response-content-coding': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 32, true);
          var variant40 = e;
          if (variant40 === null || variant40=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant40;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var ptr39 = utf8Encode(e, realloc0, memory0);
            var len39 = utf8EncodedLen;
            dataView(memory0).setInt32(arg3 + 24, len39, true);
            dataView(memory0).setInt32(arg3 + 20, ptr39, true);
          }
          break;
        }
        case 'HTTP-response-timeout': {
          dataView(memory0).setInt8(arg3 + 8, 33, true);
          break;
        }
        case 'HTTP-upgrade-failed': {
          dataView(memory0).setInt8(arg3 + 8, 34, true);
          break;
        }
        case 'HTTP-protocol-error': {
          dataView(memory0).setInt8(arg3 + 8, 35, true);
          break;
        }
        case 'loop-detected': {
          dataView(memory0).setInt8(arg3 + 8, 36, true);
          break;
        }
        case 'configuration-error': {
          dataView(memory0).setInt8(arg3 + 8, 37, true);
          break;
        }
        case 'internal-error': {
          const e = variant43.val;
          dataView(memory0).setInt8(arg3 + 8, 38, true);
          var variant42 = e;
          if (variant42 === null || variant42=== undefined) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e = variant42;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var ptr41 = utf8Encode(e, realloc0, memory0);
            var len41 = utf8EncodedLen;
            dataView(memory0).setInt32(arg3 + 24, len41, true);
            dataView(memory0).setInt32(arg3 + 20, ptr41, true);
          }
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant43.tag)}\` (received \`${variant43}\`) specified for \`ErrorCode\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline25(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc1(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new Error('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = handleCnt9++;
    handleTable9.set(handle1, { rep: tuple0_0, own: true });
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc1, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}
let realloc1;

function trampoline26(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rsc0 = handleTable9.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.writeViaStream.call(rsc0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new Error('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle2 = handleCnt2++;
      handleTable2.set(handle2, { rep: e, own: true });
      dataView(memory0).setInt32(arg2 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline27(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable9.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.appendViaStream.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new Error('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle2 = handleCnt2++;
      handleTable2.set(handle2, { rep: e, own: true });
      dataView(memory0).setInt32(arg1 + 4, handle2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline28(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable9.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.getType.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val2 = e;
      let enum2;
      switch (val2) {
        case 'unknown': {
          enum2 = 0;
          break;
        }
        case 'block-device': {
          enum2 = 1;
          break;
        }
        case 'character-device': {
          enum2 = 2;
          break;
        }
        case 'directory': {
          enum2 = 3;
          break;
        }
        case 'fifo': {
          enum2 = 4;
          break;
        }
        case 'symbolic-link': {
          enum2 = 5;
          break;
        }
        case 'regular-file': {
          enum2 = 6;
          break;
        }
        case 'socket': {
          enum2 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline29(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable9.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Descriptor.prototype.stat.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant11 = ret;
  switch (variant11.tag) {
    case 'ok': {
      const e = variant11.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {type: v2_0, linkCount: v2_1, size: v2_2, dataAccessTimestamp: v2_3, dataModificationTimestamp: v2_4, statusChangeTimestamp: v2_5 } = e;
      var val3 = v2_0;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((v2_0) instanceof Error) {
            console.error(v2_0);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v2_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v2_2), true);
      var variant5 = v2_3;
      if (variant5 === null || variant5=== undefined) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant5;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var {seconds: v4_0, nanoseconds: v4_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v4_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v4_1), true);
      }
      var variant7 = v2_4;
      if (variant7 === null || variant7=== undefined) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant7;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var {seconds: v6_0, nanoseconds: v6_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v6_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v6_1), true);
      }
      var variant9 = v2_5;
      if (variant9 === null || variant9=== undefined) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant9;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var {seconds: v8_0, nanoseconds: v8_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v8_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v8_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant11.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val10 = e;
      let enum10;
      switch (val10) {
        case 'access': {
          enum10 = 0;
          break;
        }
        case 'would-block': {
          enum10 = 1;
          break;
        }
        case 'already': {
          enum10 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum10 = 3;
          break;
        }
        case 'busy': {
          enum10 = 4;
          break;
        }
        case 'deadlock': {
          enum10 = 5;
          break;
        }
        case 'quota': {
          enum10 = 6;
          break;
        }
        case 'exist': {
          enum10 = 7;
          break;
        }
        case 'file-too-large': {
          enum10 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum10 = 9;
          break;
        }
        case 'in-progress': {
          enum10 = 10;
          break;
        }
        case 'interrupted': {
          enum10 = 11;
          break;
        }
        case 'invalid': {
          enum10 = 12;
          break;
        }
        case 'io': {
          enum10 = 13;
          break;
        }
        case 'is-directory': {
          enum10 = 14;
          break;
        }
        case 'loop': {
          enum10 = 15;
          break;
        }
        case 'too-many-links': {
          enum10 = 16;
          break;
        }
        case 'message-size': {
          enum10 = 17;
          break;
        }
        case 'name-too-long': {
          enum10 = 18;
          break;
        }
        case 'no-device': {
          enum10 = 19;
          break;
        }
        case 'no-entry': {
          enum10 = 20;
          break;
        }
        case 'no-lock': {
          enum10 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum10 = 22;
          break;
        }
        case 'insufficient-space': {
          enum10 = 23;
          break;
        }
        case 'not-directory': {
          enum10 = 24;
          break;
        }
        case 'not-empty': {
          enum10 = 25;
          break;
        }
        case 'not-recoverable': {
          enum10 = 26;
          break;
        }
        case 'unsupported': {
          enum10 = 27;
          break;
        }
        case 'no-tty': {
          enum10 = 28;
          break;
        }
        case 'no-such-device': {
          enum10 = 29;
          break;
        }
        case 'overflow': {
          enum10 = 30;
          break;
        }
        case 'not-permitted': {
          enum10 = 31;
          break;
        }
        case 'pipe': {
          enum10 = 32;
          break;
        }
        case 'read-only': {
          enum10 = 33;
          break;
        }
        case 'invalid-seek': {
          enum10 = 34;
          break;
        }
        case 'text-file-busy': {
          enum10 = 35;
          break;
        }
        case 'cross-device': {
          enum10 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val10}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum10, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline30(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable1.get(handle1).rep;
  const ret = filesystemErrorCode(rsc0);
  var variant3 = ret;
  if (variant3 === null || variant3=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val2 = e;
    let enum2;
    switch (val2) {
      case 'access': {
        enum2 = 0;
        break;
      }
      case 'would-block': {
        enum2 = 1;
        break;
      }
      case 'already': {
        enum2 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum2 = 3;
        break;
      }
      case 'busy': {
        enum2 = 4;
        break;
      }
      case 'deadlock': {
        enum2 = 5;
        break;
      }
      case 'quota': {
        enum2 = 6;
        break;
      }
      case 'exist': {
        enum2 = 7;
        break;
      }
      case 'file-too-large': {
        enum2 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum2 = 9;
        break;
      }
      case 'in-progress': {
        enum2 = 10;
        break;
      }
      case 'interrupted': {
        enum2 = 11;
        break;
      }
      case 'invalid': {
        enum2 = 12;
        break;
      }
      case 'io': {
        enum2 = 13;
        break;
      }
      case 'is-directory': {
        enum2 = 14;
        break;
      }
      case 'loop': {
        enum2 = 15;
        break;
      }
      case 'too-many-links': {
        enum2 = 16;
        break;
      }
      case 'message-size': {
        enum2 = 17;
        break;
      }
      case 'name-too-long': {
        enum2 = 18;
        break;
      }
      case 'no-device': {
        enum2 = 19;
        break;
      }
      case 'no-entry': {
        enum2 = 20;
        break;
      }
      case 'no-lock': {
        enum2 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum2 = 22;
        break;
      }
      case 'insufficient-space': {
        enum2 = 23;
        break;
      }
      case 'not-directory': {
        enum2 = 24;
        break;
      }
      case 'not-empty': {
        enum2 = 25;
        break;
      }
      case 'not-recoverable': {
        enum2 = 26;
        break;
      }
      case 'unsupported': {
        enum2 = 27;
        break;
      }
      case 'no-tty': {
        enum2 = 28;
        break;
      }
      case 'no-such-device': {
        enum2 = 29;
        break;
      }
      case 'overflow': {
        enum2 = 30;
        break;
      }
      case 'not-permitted': {
        enum2 = 31;
        break;
      }
      case 'pipe': {
        enum2 = 32;
        break;
      }
      case 'read-only': {
        enum2 = 33;
        break;
      }
      case 'invalid-seek': {
        enum2 = 34;
        break;
      }
      case 'text-file-busy': {
        enum2 = 35;
        break;
      }
      case 'cross-device': {
        enum2 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val2}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum2, true);
  }
}

function trampoline31(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.checkWrite.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant3 = e;
      switch (variant3.tag) {
        case 'last-operation-failed': {
          const e = variant3.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle2 = handleCnt1++;
          handleTable1.set(handle2, { rep: e, own: true });
          dataView(memory0).setInt32(arg1 + 12, handle2, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline32(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  var ptr2 = arg1;
  var len2 = arg2;
  var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.write.call(rsc0, result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt1++;
          handleTable1.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg3 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline33(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  var ptr2 = arg1;
  var len2 = arg2;
  var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.blockingWriteAndFlush.call(rsc0, result2) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = handleCnt1++;
          handleTable1.set(handle3, { rep: e, own: true });
          dataView(memory0).setInt32(arg3 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline34(arg0, arg1) {
  var handle1 = arg0;
  var rsc0 = handleTable2.get(handle1).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: OutputStream.prototype.blockingFlush.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant3 = e;
      switch (variant3.tag) {
        case 'last-operation-failed': {
          const e = variant3.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new Error('Resource error: Not a valid "Error" resource.');
          }
          var handle2 = handleCnt1++;
          handleTable1.set(handle2, { rep: e, own: true });
          dataView(memory0).setInt32(arg1 + 8, handle2, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline35(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc1(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc1, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc1, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}
let exports3;
let postReturn0;
let postReturn1;
function trampoline2(rep) {
  const handle = handleCnt11++;
  handleTable11.set(handle, { rep, own: true });
  return handle;
}
function trampoline5(handle) {
  const handleEntry = handleTable0.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable0.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline6(handle) {
  const handleEntry = handleTable6.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable6.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline7(rep) {
  const handle = handleCnt10++;
  handleTable10.set(handle, { rep, own: true });
  return handle;
}
function trampoline8(handle) {
  const handleEntry = handleTable1.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable1.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline9(handle) {
  const handleEntry = handleTable3.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable3.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline10(handle) {
  const handleEntry = handleTable2.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable2.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}
function trampoline11(handle) {
  const handleEntry = handleTable9.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable9.delete(handle);
  if (handleEntry.own && handleEntry.rep[symbolDispose]) {
    handleEntry.rep[symbolDispose]();
  }
}

class WasmVersionTestsClient{
  constructor() {
    const ret = exports1['wasm-version-tests:component/clients#[constructor]wasm-version-tests-client']();
    var handle1 = ret;
    var rsc0 = new.target === WasmVersionTestsClient ? this : Object.create(WasmVersionTestsClient.prototype);
    var rep2 = handleTable10.get(handle1).rep;
    Object.defineProperty(rsc0, resourceHandleSymbol, { writable: true, value: rep2});
    finalizationRegistry10.register(rsc0, handle1, rsc0);
    Object.defineProperty(rsc0, symbolDispose, { writable: true, value: function () {} });
    
    handleTable10.delete(handle1);
    return rsc0;
  }
}

WasmVersionTestsClient.prototype.helloWorld = function helloWorld() {
  var handle0 = this[resourceHandleSymbol];
  if (handle0=== null) {
    throw new Error('Resource error: "WasmVersionTestsClient" lifetime expired.');
  }
  if (handle0=== undefined) {
    throw new Error('Resource error: Not a valid "WasmVersionTestsClient" resource.');
  }
  
  const ret = exports1['wasm-version-tests:component/clients#[method]wasm-version-tests-client.hello-world'](handle0);
  if (handleTable10.get(handle0)) {
    throw new Error('Resource error: borrows were not dropped');
  }
  var ptr1 = dataView(memory0).getInt32(ret + 0, true);
  var len1 = dataView(memory0).getInt32(ret + 4, true);
  var result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
  postReturn0(ret);
  return result1;
};

class WasmVersionTestsEvent{
  constructor() {
    const ret = exports1['wasm-version-tests:component/events#[constructor]wasm-version-tests-event']();
    var handle1 = ret;
    var rsc0 = new.target === WasmVersionTestsEvent ? this : Object.create(WasmVersionTestsEvent.prototype);
    var rep2 = handleTable11.get(handle1).rep;
    Object.defineProperty(rsc0, resourceHandleSymbol, { writable: true, value: rep2});
    finalizationRegistry11.register(rsc0, handle1, rsc0);
    Object.defineProperty(rsc0, symbolDispose, { writable: true, value: function () {} });
    
    handleTable11.delete(handle1);
    return rsc0;
  }
}

WasmVersionTestsEvent.prototype.parse = function parse(arg1) {
  var handle0 = this[resourceHandleSymbol];
  if (handle0=== null) {
    throw new Error('Resource error: "WasmVersionTestsEvent" lifetime expired.');
  }
  if (handle0=== undefined) {
    throw new Error('Resource error: Not a valid "WasmVersionTestsEvent" resource.');
  }
  
  var ptr1 = utf8Encode(arg1, realloc0, memory0);
  var len1 = utf8EncodedLen;
  const ret = exports1['wasm-version-tests:component/events#[method]wasm-version-tests-event.parse'](handle0, ptr1, len1);
  if (handleTable11.get(handle0)) {
    throw new Error('Resource error: borrows were not dropped');
  }
  let variant36;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var handle3 = dataView(memory0).getInt32(ret + 8, true);
      var rsc2 = handleTable7.get(handle3).rep;
      handleTable7.delete(handle3);
      variant36= {
        tag: 'ok',
        val: rsc2
      };
      break;
    }
    case 1: {
      let variant35;
      switch (dataView(memory0).getUint8(ret + 8, true)) {
        case 0: {
          variant35= {
            tag: 'DNS-timeout',
          };
          break;
        }
        case 1: {
          let variant5;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant5 = undefined;
              break;
            }
            case 1: {
              var ptr4 = dataView(memory0).getInt32(ret + 20, true);
              var len4 = dataView(memory0).getInt32(ret + 24, true);
              var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
              variant5 = result4;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          let variant6;
          switch (dataView(memory0).getUint8(ret + 28, true)) {
            case 0: {
              variant6 = undefined;
              break;
            }
            case 1: {
              variant6 = clampGuest(dataView(memory0).getUint16(ret + 30, true), 0, 65535);
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'DNS-error',
            val: {
              rcode: variant5,
              infoCode: variant6,
            }
          };
          break;
        }
        case 2: {
          variant35= {
            tag: 'destination-not-found',
          };
          break;
        }
        case 3: {
          variant35= {
            tag: 'destination-unavailable',
          };
          break;
        }
        case 4: {
          variant35= {
            tag: 'destination-IP-prohibited',
          };
          break;
        }
        case 5: {
          variant35= {
            tag: 'destination-IP-unroutable',
          };
          break;
        }
        case 6: {
          variant35= {
            tag: 'connection-refused',
          };
          break;
        }
        case 7: {
          variant35= {
            tag: 'connection-terminated',
          };
          break;
        }
        case 8: {
          variant35= {
            tag: 'connection-timeout',
          };
          break;
        }
        case 9: {
          variant35= {
            tag: 'connection-read-timeout',
          };
          break;
        }
        case 10: {
          variant35= {
            tag: 'connection-write-timeout',
          };
          break;
        }
        case 11: {
          variant35= {
            tag: 'connection-limit-reached',
          };
          break;
        }
        case 12: {
          variant35= {
            tag: 'TLS-protocol-error',
          };
          break;
        }
        case 13: {
          variant35= {
            tag: 'TLS-certificate-error',
          };
          break;
        }
        case 14: {
          let variant7;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant7 = undefined;
              break;
            }
            case 1: {
              variant7 = clampGuest(dataView(memory0).getUint8(ret + 17, true), 0, 255);
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          let variant9;
          switch (dataView(memory0).getUint8(ret + 20, true)) {
            case 0: {
              variant9 = undefined;
              break;
            }
            case 1: {
              var ptr8 = dataView(memory0).getInt32(ret + 24, true);
              var len8 = dataView(memory0).getInt32(ret + 28, true);
              var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
              variant9 = result8;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'TLS-alert-received',
            val: {
              alertId: variant7,
              alertMessage: variant9,
            }
          };
          break;
        }
        case 15: {
          variant35= {
            tag: 'HTTP-request-denied',
          };
          break;
        }
        case 16: {
          variant35= {
            tag: 'HTTP-request-length-required',
          };
          break;
        }
        case 17: {
          let variant10;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant10 = undefined;
              break;
            }
            case 1: {
              variant10 = BigInt.asUintN(64, dataView(memory0).getBigInt64(ret + 24, true));
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-request-body-size',
            val: variant10
          };
          break;
        }
        case 18: {
          variant35= {
            tag: 'HTTP-request-method-invalid',
          };
          break;
        }
        case 19: {
          variant35= {
            tag: 'HTTP-request-URI-invalid',
          };
          break;
        }
        case 20: {
          variant35= {
            tag: 'HTTP-request-URI-too-long',
          };
          break;
        }
        case 21: {
          let variant11;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant11 = undefined;
              break;
            }
            case 1: {
              variant11 = dataView(memory0).getInt32(ret + 20, true) >>> 0;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-request-header-section-size',
            val: variant11
          };
          break;
        }
        case 22: {
          let variant15;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant15 = undefined;
              break;
            }
            case 1: {
              let variant13;
              switch (dataView(memory0).getUint8(ret + 20, true)) {
                case 0: {
                  variant13 = undefined;
                  break;
                }
                case 1: {
                  var ptr12 = dataView(memory0).getInt32(ret + 24, true);
                  var len12 = dataView(memory0).getInt32(ret + 28, true);
                  var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
                  variant13 = result12;
                  break;
                }
                default: {
                  throw new TypeError('invalid variant discriminant for option');
                }
              }
              let variant14;
              switch (dataView(memory0).getUint8(ret + 32, true)) {
                case 0: {
                  variant14 = undefined;
                  break;
                }
                case 1: {
                  variant14 = dataView(memory0).getInt32(ret + 36, true) >>> 0;
                  break;
                }
                default: {
                  throw new TypeError('invalid variant discriminant for option');
                }
              }
              variant15 = {
                fieldName: variant13,
                fieldSize: variant14,
              };
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-request-header-size',
            val: variant15
          };
          break;
        }
        case 23: {
          let variant16;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant16 = undefined;
              break;
            }
            case 1: {
              variant16 = dataView(memory0).getInt32(ret + 20, true) >>> 0;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-request-trailer-section-size',
            val: variant16
          };
          break;
        }
        case 24: {
          let variant18;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant18 = undefined;
              break;
            }
            case 1: {
              var ptr17 = dataView(memory0).getInt32(ret + 20, true);
              var len17 = dataView(memory0).getInt32(ret + 24, true);
              var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
              variant18 = result17;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          let variant19;
          switch (dataView(memory0).getUint8(ret + 28, true)) {
            case 0: {
              variant19 = undefined;
              break;
            }
            case 1: {
              variant19 = dataView(memory0).getInt32(ret + 32, true) >>> 0;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-request-trailer-size',
            val: {
              fieldName: variant18,
              fieldSize: variant19,
            }
          };
          break;
        }
        case 25: {
          variant35= {
            tag: 'HTTP-response-incomplete',
          };
          break;
        }
        case 26: {
          let variant20;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant20 = undefined;
              break;
            }
            case 1: {
              variant20 = dataView(memory0).getInt32(ret + 20, true) >>> 0;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-response-header-section-size',
            val: variant20
          };
          break;
        }
        case 27: {
          let variant22;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant22 = undefined;
              break;
            }
            case 1: {
              var ptr21 = dataView(memory0).getInt32(ret + 20, true);
              var len21 = dataView(memory0).getInt32(ret + 24, true);
              var result21 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr21, len21));
              variant22 = result21;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          let variant23;
          switch (dataView(memory0).getUint8(ret + 28, true)) {
            case 0: {
              variant23 = undefined;
              break;
            }
            case 1: {
              variant23 = dataView(memory0).getInt32(ret + 32, true) >>> 0;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-response-header-size',
            val: {
              fieldName: variant22,
              fieldSize: variant23,
            }
          };
          break;
        }
        case 28: {
          let variant24;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant24 = undefined;
              break;
            }
            case 1: {
              variant24 = BigInt.asUintN(64, dataView(memory0).getBigInt64(ret + 24, true));
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-response-body-size',
            val: variant24
          };
          break;
        }
        case 29: {
          let variant25;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant25 = undefined;
              break;
            }
            case 1: {
              variant25 = dataView(memory0).getInt32(ret + 20, true) >>> 0;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-response-trailer-section-size',
            val: variant25
          };
          break;
        }
        case 30: {
          let variant27;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant27 = undefined;
              break;
            }
            case 1: {
              var ptr26 = dataView(memory0).getInt32(ret + 20, true);
              var len26 = dataView(memory0).getInt32(ret + 24, true);
              var result26 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr26, len26));
              variant27 = result26;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          let variant28;
          switch (dataView(memory0).getUint8(ret + 28, true)) {
            case 0: {
              variant28 = undefined;
              break;
            }
            case 1: {
              variant28 = dataView(memory0).getInt32(ret + 32, true) >>> 0;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-response-trailer-size',
            val: {
              fieldName: variant27,
              fieldSize: variant28,
            }
          };
          break;
        }
        case 31: {
          let variant30;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant30 = undefined;
              break;
            }
            case 1: {
              var ptr29 = dataView(memory0).getInt32(ret + 20, true);
              var len29 = dataView(memory0).getInt32(ret + 24, true);
              var result29 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr29, len29));
              variant30 = result29;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-response-transfer-coding',
            val: variant30
          };
          break;
        }
        case 32: {
          let variant32;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant32 = undefined;
              break;
            }
            case 1: {
              var ptr31 = dataView(memory0).getInt32(ret + 20, true);
              var len31 = dataView(memory0).getInt32(ret + 24, true);
              var result31 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr31, len31));
              variant32 = result31;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'HTTP-response-content-coding',
            val: variant32
          };
          break;
        }
        case 33: {
          variant35= {
            tag: 'HTTP-response-timeout',
          };
          break;
        }
        case 34: {
          variant35= {
            tag: 'HTTP-upgrade-failed',
          };
          break;
        }
        case 35: {
          variant35= {
            tag: 'HTTP-protocol-error',
          };
          break;
        }
        case 36: {
          variant35= {
            tag: 'loop-detected',
          };
          break;
        }
        case 37: {
          variant35= {
            tag: 'configuration-error',
          };
          break;
        }
        case 38: {
          let variant34;
          switch (dataView(memory0).getUint8(ret + 16, true)) {
            case 0: {
              variant34 = undefined;
              break;
            }
            case 1: {
              var ptr33 = dataView(memory0).getInt32(ret + 20, true);
              var len33 = dataView(memory0).getInt32(ret + 24, true);
              var result33 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr33, len33));
              variant34 = result33;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant35= {
            tag: 'internal-error',
            val: variant34
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for ErrorCode');
        }
      }
      variant36= {
        tag: 'err',
        val: variant35
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn1(ret);
  if (variant36.tag === 'err') {
    throw new ComponentError(variant36.val);
  }
  return variant36.val;
};
const handleTable0= new Map();
let handleCnt0 = 0;
const handleTable1= new Map();
let handleCnt1 = 0;
const handleTable2= new Map();
let handleCnt2 = 0;
const handleTable3= new Map();
let handleCnt3 = 0;
const handleTable4= new Map();
let handleCnt4 = 0;
const handleTable5= new Map();
let handleCnt5 = 0;
const handleTable6= new Map();
let handleCnt6 = 0;
const handleTable7= new Map();
let handleCnt7 = 0;
const handleTable8= new Map();
let handleCnt8 = 0;
const handleTable9= new Map();
let handleCnt9 = 0;
const handleTable10= new Map();
let handleCnt10 = 0;
const finalizationRegistry10= new FinalizationRegistry(handle => {
  const handleEntry = handleTable10.get(handle);
  if (handleEntry) {
    handleTable10.delete(handle);
    
    if (handleEntry.own) {
      exports0['24'](handleEntry.rep);
    }
  }
});

const handleTable11= new Map();
let handleCnt11 = 0;
const finalizationRegistry11= new FinalizationRegistry(handle => {
  const handleEntry = handleTable11.get(handle);
  if (handleEntry) {
    handleTable11.delete(handle);
    
    if (handleEntry.own) {
      exports0['25'](handleEntry.rep);
    }
  }
});


const $init = (async() => {
  const module0 = fetchCompile(new URL('./wasm_version_tests_component.core.wasm', import.meta.url));
  const module1 = fetchCompile(new URL('./wasm_version_tests_component.core2.wasm', import.meta.url));
  const module2 = base64Compile('AGFzbQEAAAABOAlgA39/fwBgAn9/AGAEf39/fwF/YAV/f39/fwF/YAR/f39/AGABfwBgA39+fwBgAn9/AX9gAX8AAxsaAAECAQMBAgEEBQYBAQEBAQQEAQUCBwcICAgEBQFwARoaB4QBGwEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOAjE1AA8CMTYAEAIxNwARAjE4ABICMTkAEwIyMAAUAjIxABUCMjIAFgIyMwAXAjI0ABgCMjUAGQgkaW1wb3J0cwEACtECGg0AIAAgASACQQARAAALCwAgACABQQERAQALDwAgACABIAIgA0ECEQIACwsAIAAgAUEDEQEACxEAIAAgASACIAMgBEEEEQMACwsAIAAgAUEFEQEACw8AIAAgASACIANBBhECAAsLACAAIAFBBxEBAAsPACAAIAEgAiADQQgRBAALCQAgAEEJEQUACw0AIAAgASACQQoRBgALCwAgACABQQsRAQALCwAgACABQQwRAQALCwAgACABQQ0RAQALCwAgACABQQ4RAQALCwAgACABQQ8RAQALDwAgACABIAIgA0EQEQQACw8AIAAgASACIANBEREEAAsLACAAIAFBEhEBAAsJACAAQRMRBQALDwAgACABIAIgA0EUEQIACwsAIAAgAUEVEQcACwsAIAAgAUEWEQcACwkAIABBFxEIAAsJACAAQRgRCAALCQAgAEEZEQgACwAuCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BjAuMTguMACcDwRuYW1lABMSd2l0LWNvbXBvbmVudDpzaGltAf8OGgBFaW5kaXJlY3Qtd2FzaTpodHRwL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTItMDUtW3N0YXRpY11maWVsZHMuZnJvbS1saXN0AVVpbmRpcmVjdC13YXNpOmh0dHAvdHlwZXNAMC4yLjAtcmMtMjAyMy0xMi0wNS1bbWV0aG9kXW91dGdvaW5nLXJlcXVlc3QucGF0aC13aXRoLXF1ZXJ5AllpbmRpcmVjdC13YXNpOmh0dHAvdHlwZXNAMC4yLjAtcmMtMjAyMy0xMi0wNS1bbWV0aG9kXW91dGdvaW5nLXJlcXVlc3Quc2V0LXBhdGgtd2l0aC1xdWVyeQNMaW5kaXJlY3Qtd2FzaTpodHRwL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTItMDUtW21ldGhvZF1vdXRnb2luZy1yZXF1ZXN0LnNjaGVtZQRQaW5kaXJlY3Qtd2FzaTpodHRwL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTItMDUtW21ldGhvZF1vdXRnb2luZy1yZXF1ZXN0LnNldC1zY2hlbWUFT2luZGlyZWN0LXdhc2k6aHR0cC90eXBlc0AwLjIuMC1yYy0yMDIzLTEyLTA1LVttZXRob2Rdb3V0Z29pbmctcmVxdWVzdC5hdXRob3JpdHkGU2luZGlyZWN0LXdhc2k6aHR0cC90eXBlc0AwLjIuMC1yYy0yMDIzLTEyLTA1LVttZXRob2Rdb3V0Z29pbmctcmVxdWVzdC5zZXQtYXV0aG9yaXR5B1FpbmRpcmVjdC13YXNpOmh0dHAvdHlwZXNAMC4yLjAtcmMtMjAyMy0xMi0wNS1bbWV0aG9kXWZ1dHVyZS1pbmNvbWluZy1yZXNwb25zZS5nZXQIPmluZGlyZWN0LXdhc2k6aHR0cC9vdXRnb2luZy1oYW5kbGVyQDAuMi4wLXJjLTIwMjMtMTItMDUtaGFuZGxlCUVpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vcHJlb3BlbnNAMC4yLjAtcmMtMjAyMy0xMS0xMC1nZXQtZGlyZWN0b3JpZXMKVmluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1yYy0yMDIzLTExLTEwLVttZXRob2RdZGVzY3JpcHRvci53cml0ZS12aWEtc3RyZWFtC1dpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtcmMtMjAyMy0xMS0xMC1bbWV0aG9kXWRlc2NyaXB0b3IuYXBwZW5kLXZpYS1zdHJlYW0MTmluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1yYy0yMDIzLTExLTEwLVttZXRob2RdZGVzY3JpcHRvci5nZXQtdHlwZQ1KaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLXJjLTIwMjMtMTEtMTAtW21ldGhvZF1kZXNjcmlwdG9yLnN0YXQOSGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMC1yYy0yMDIzLTExLTEwLWZpbGVzeXN0ZW0tZXJyb3ItY29kZQ9OaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4wLXJjLTIwMjMtMTEtMTAtW21ldGhvZF1vdXRwdXQtc3RyZWFtLmNoZWNrLXdyaXRlEEhpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjAtcmMtMjAyMy0xMS0xMC1bbWV0aG9kXW91dHB1dC1zdHJlYW0ud3JpdGURW2luZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1yYy0yMDIzLTExLTEwLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy13cml0ZS1hbmQtZmx1c2gSUWluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1yYy0yMDIzLTExLTEwLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy1mbHVzaBNBaW5kaXJlY3Qtd2FzaTpjbGkvZW52aXJvbm1lbnRAMC4yLjAtcmMtMjAyMy0xMi0wNS1nZXQtZW52aXJvbm1lbnQUJWFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfd3JpdGUVKGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9nZXQWLmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9zaXplc19nZXQXJmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcHJvY19leGl0GEtkdG9yLVtleHBvcnRdd2FzbS12ZXJzaW9uLXRlc3RzOmNvbXBvbmVudC9jbGllbnRzLXdhc20tdmVyc2lvbi10ZXN0cy1jbGllbnQZSWR0b3ItW2V4cG9ydF13YXNtLXZlcnNpb24tdGVzdHM6Y29tcG9uZW50L2V2ZW50cy13YXNtLXZlcnNpb24tdGVzdHMtZXZlbnQ');
  const module3 = base64Compile('AGFzbQEAAAABOAlgA39/fwBgAn9/AGAEf39/fwF/YAV/f39/fwF/YAR/f39/AGABfwBgA39+fwBgAn9/AX9gAX8AAqIBGwABMAAAAAExAAEAATIAAgABMwABAAE0AAMAATUAAQABNgACAAE3AAEAATgABAABOQAFAAIxMAAGAAIxMQABAAIxMgABAAIxMwABAAIxNAABAAIxNQABAAIxNgAEAAIxNwAEAAIxOAABAAIxOQAFAAIyMAACAAIyMQAHAAIyMgAHAAIyMwAIAAIyNAAIAAIyNQAIAAgkaW1wb3J0cwFwARoaCSABAEEACxoAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGQAuCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BjAuMTguMAAcBG5hbWUAFRR3aXQtY29tcG9uZW50OmZpeHVwcw');
  ({ exports: exports0 } = await instantiateCore(await module2));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    '[export]wasm-version-tests:component/clients': {
      '[resource-new]wasm-version-tests-client': trampoline7,
    },
    '[export]wasm-version-tests:component/events': {
      '[resource-new]wasm-version-tests-event': trampoline2,
    },
    'wasi:http/outgoing-handler@0.2.0-rc-2023-12-05': {
      handle: exports0['8'],
    },
    'wasi:http/types@0.2.0-rc-2023-12-05': {
      '[constructor]outgoing-request': trampoline0,
      '[method]future-incoming-response.get': exports0['7'],
      '[method]future-incoming-response.subscribe': trampoline1,
      '[method]outgoing-request.authority': exports0['5'],
      '[method]outgoing-request.path-with-query': exports0['1'],
      '[method]outgoing-request.scheme': exports0['3'],
      '[method]outgoing-request.set-authority': exports0['6'],
      '[method]outgoing-request.set-path-with-query': exports0['2'],
      '[method]outgoing-request.set-scheme': exports0['4'],
      '[resource-drop]future-incoming-response': trampoline6,
      '[static]fields.from-list': exports0['0'],
    },
    'wasi:io/poll@0.2.0-rc-2023-11-10': {
      '[method]pollable.block': trampoline3,
      '[method]pollable.ready': trampoline4,
      '[resource-drop]pollable': trampoline5,
    },
    wasi_snapshot_preview1: {
      environ_get: exports0['21'],
      environ_sizes_get: exports0['22'],
      fd_write: exports0['20'],
      proc_exit: exports0['23'],
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module1, {
    __main_module__: {
      cabi_realloc: exports1.cabi_realloc,
    },
    env: {
      memory: exports1.memory,
    },
    'wasi:cli/environment@0.2.0-rc-2023-12-05': {
      'get-environment': exports0['19'],
    },
    'wasi:cli/exit@0.2.0-rc-2023-12-05': {
      exit: trampoline13,
    },
    'wasi:cli/stderr@0.2.0-rc-2023-12-05': {
      'get-stderr': trampoline12,
    },
    'wasi:cli/stdin@0.2.0-rc-2023-12-05': {
      'get-stdin': trampoline14,
    },
    'wasi:cli/stdout@0.2.0-rc-2023-12-05': {
      'get-stdout': trampoline15,
    },
    'wasi:filesystem/preopens@0.2.0-rc-2023-11-10': {
      'get-directories': exports0['9'],
    },
    'wasi:filesystem/types@0.2.0-rc-2023-11-10': {
      '[method]descriptor.append-via-stream': exports0['11'],
      '[method]descriptor.get-type': exports0['12'],
      '[method]descriptor.stat': exports0['13'],
      '[method]descriptor.write-via-stream': exports0['10'],
      '[resource-drop]descriptor': trampoline11,
      'filesystem-error-code': exports0['14'],
    },
    'wasi:io/error@0.2.0-rc-2023-11-10': {
      '[resource-drop]error': trampoline8,
    },
    'wasi:io/streams@0.2.0-rc-2023-11-10': {
      '[method]output-stream.blocking-flush': exports0['18'],
      '[method]output-stream.blocking-write-and-flush': exports0['17'],
      '[method]output-stream.check-write': exports0['15'],
      '[method]output-stream.write': exports0['16'],
      '[resource-drop]input-stream': trampoline9,
      '[resource-drop]output-stream': trampoline10,
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports1.cabi_realloc;
  realloc1 = exports2.cabi_import_realloc;
  ({ exports: exports3 } = await instantiateCore(await module3, {
    '': {
      $imports: exports0.$imports,
      '0': trampoline16,
      '1': trampoline17,
      '10': trampoline26,
      '11': trampoline27,
      '12': trampoline28,
      '13': trampoline29,
      '14': trampoline30,
      '15': trampoline31,
      '16': trampoline32,
      '17': trampoline33,
      '18': trampoline34,
      '19': trampoline35,
      '2': trampoline18,
      '20': exports2.fd_write,
      '21': exports2.environ_get,
      '22': exports2.environ_sizes_get,
      '23': exports2.proc_exit,
      '24': exports1['wasm-version-tests:component/clients#[dtor]wasm-version-tests-client'],
      '25': exports1['wasm-version-tests:component/events#[dtor]wasm-version-tests-event'],
      '3': trampoline19,
      '4': trampoline20,
      '5': trampoline21,
      '6': trampoline22,
      '7': trampoline23,
      '8': trampoline24,
      '9': trampoline25,
    },
  }));
  postReturn0 = exports1['cabi_post_wasm-version-tests:component/clients#[method]wasm-version-tests-client.hello-world'];
  postReturn1 = exports1['cabi_post_wasm-version-tests:component/events#[method]wasm-version-tests-event.parse'];
})();

await $init;
const clients = {
  WasmVersionTestsClient: WasmVersionTestsClient,
  
};
const events = {
  WasmVersionTestsEvent: WasmVersionTestsEvent,
  
};

export { clients, events,  }