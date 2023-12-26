from ..intrinsics import _decode_utf8, _load
import ctypes
import wasmtime

from typing import TYPE_CHECKING
if TYPE_CHECKING:
  from .. import Root

class Clients:
    component: 'Root'
    
    def __init__(self, component: 'Root') -> None:
        self.component = component
    def hello_world(self, caller: wasmtime.Store) -> str:
        ret = self.component.lift_callee0(caller)
        assert(isinstance(ret, int))
        load = _load(ctypes.c_int32, self.component._core_memory0, caller, ret, 0)
        load0 = _load(ctypes.c_int32, self.component._core_memory0, caller, ret, 4)
        ptr = load
        len1 = load0
        list = _decode_utf8(self.component._core_memory0, caller, ptr, len1)
        self.component._post_return0(caller, ret)
        return list
