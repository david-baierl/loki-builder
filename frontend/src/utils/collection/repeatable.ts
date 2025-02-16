export class Repeatable<T, TReturn = any, TNext = any> implements Iterable<T, TReturn, TNext> {
  constructor(
    private _factory: () => Iterable<T, TReturn, TNext>,
  ) {}

  [Symbol.iterator]() {
    return this._factory()[Symbol.iterator]()
  }
}
