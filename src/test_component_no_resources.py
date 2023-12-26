#!/usr/bin/env python3

from .generated_py_runtime_no_resources_bindings.pybind import Root
from wasmtime import Engine, Store, Config

def get_wasm_module():
    config = Config()
    engine = Engine(config)
    store = Store(engine)
    root = Root(store)
    return (root, store)


def test_wasm_hello_world():
    (act_runtime, store) = get_wasm_module()
    clients = act_runtime.clients()
    assert clients.hello_world(store) == "Hello World"

def test_wasm_event_parse_succ():
    (act_runtime, store) = get_wasm_module()
    events = act_runtime.events()
    parsed_event = events.parse(store, '{ "bar": "ATestString" }')
    assert parsed_event.value.bar == "ATestString"


def test_wasm_event_parse_fail():
    (act_runtime, store) = get_wasm_module()
    events = act_runtime.events()
    parsed_event = events.parse(store, '{ "notBar": "ATestString" }')
    assert "missing field `bar`" in parsed_event.value 
