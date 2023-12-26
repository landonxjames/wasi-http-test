from .exports import clients, events
import pathlib
import wasmtime

class Root:
    
    def __init__(self, store: wasmtime.Store) -> None:
        path = pathlib.Path(__file__).parent / ('root.core0.wasm')
        module = wasmtime.Module.from_file(store.engine, path)
        instance0 = wasmtime.Instance(store, module, []).exports(store)
        core_memory0 = instance0["memory"]
        assert(isinstance(core_memory0, wasmtime.Memory))
        self._core_memory0 = core_memory0
        post_return0 = instance0["cabi_post_wasm-version-tests:component/clients#hello-world"]
        assert(isinstance(post_return0, wasmtime.Func))
        self._post_return0 = post_return0
        realloc0 = instance0["cabi_realloc"]
        assert(isinstance(realloc0, wasmtime.Func))
        self._realloc0 = realloc0
        post_return1 = instance0["cabi_post_wasm-version-tests:component/events#parse"]
        assert(isinstance(post_return1, wasmtime.Func))
        self._post_return1 = post_return1
        lift_callee0 = instance0["wasm-version-tests:component/clients#hello-world"]
        assert(isinstance(lift_callee0, wasmtime.Func))
        self.lift_callee0 = lift_callee0
        lift_callee1 = instance0["wasm-version-tests:component/events#parse"]
        assert(isinstance(lift_callee1, wasmtime.Func))
        self.lift_callee1 = lift_callee1
    def clients(self) -> clients.Clients:
        return clients.Clients(self)
    def events(self) -> events.Events:
        return events.Events(self)
