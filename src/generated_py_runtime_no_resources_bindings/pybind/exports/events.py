from ..intrinsics import _decode_utf8, _encode_utf8, _load
from ..types import Err, Ok, Result
import ctypes
from dataclasses import dataclass
import wasmtime

from typing import TYPE_CHECKING
if TYPE_CHECKING:
  from .. import Root

@dataclass
class Foo:
    bar: str

class Events:
    component: 'Root'
    
    def __init__(self, component: 'Root') -> None:
        self.component = component
    def parse(self, caller: wasmtime.Store, input: str) -> Result[Foo, str]:
        ptr, len0 = _encode_utf8(input, self.component._realloc0, self.component._core_memory0, caller)
        ret = self.component.lift_callee1(caller, ptr, len0)
        assert(isinstance(ret, int))
        load = _load(ctypes.c_uint8, self.component._core_memory0, caller, ret, 0)
        expected: Result[Foo, str]
        if load == 0:
            load1 = _load(ctypes.c_int32, self.component._core_memory0, caller, ret, 4)
            load2 = _load(ctypes.c_int32, self.component._core_memory0, caller, ret, 8)
            ptr3 = load1
            len4 = load2
            list = _decode_utf8(self.component._core_memory0, caller, ptr3, len4)
            expected = Ok(Foo(list))
        elif load == 1:
            load5 = _load(ctypes.c_int32, self.component._core_memory0, caller, ret, 4)
            load6 = _load(ctypes.c_int32, self.component._core_memory0, caller, ret, 8)
            ptr7 = load5
            len8 = load6
            list9 = _decode_utf8(self.component._core_memory0, caller, ptr7, len8)
            expected = Err(list9)
        else:
            raise TypeError("invalid variant discriminant for expected")
        self.component._post_return1(caller, ret)
        return expected
