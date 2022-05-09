export function assert(b: boolean, msg: string): asserts b {
  if (!b) {
    throw Error(msg);
  }
}
