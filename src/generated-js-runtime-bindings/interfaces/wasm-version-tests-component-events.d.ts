export namespace WasmVersionTestsComponentEvents {
  export { WasmVersionTestsEvent };
}
export interface Foo {
  bar: string,
}

export class WasmVersionTestsEvent {
  constructor()
  parse(input: string): Foo;
}
