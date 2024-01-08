export namespace WasiIoPoll {
  export { Pollable };
}

export class Pollable {
  ready(): boolean;
  block(): void;
}
