// -----------------------------------------------------------------
// base types
// -----------------------------------------------------------------

export type None = undefined
export type Some<T> = T
export type Option<T> = Some<T> | None

/**
 * an `Any` type that will not pollute every Maybe<Any> Type
 *
 * because `T & any` will always result in only `any` and remove `T`,
 * but `T & Any` will stay as is and will not remove T
 *
 * mostly usefull when only a kind of truthy/falsy value is needed
 */
export type Any = (
  | ((...args: any[]) => any)
  | boolean
  | number
  | bigint
  | string
  | object
  | any[]
  | symbol
  | null
  | undefined
)

// -----------------------------------------------------------------
// helper
// -----------------------------------------------------------------

export type MergeTuple<T extends any[]> = T extends [infer HEAD, ...infer TAIL] ? (
  TAIL extends [] ? HEAD : HEAD & MergeTuple<TAIL>
) : T

// -----------------------------------------------------------------
// global overloads
// -----------------------------------------------------------------

declare global {

  // -----------------------------------------------------------------
  // overload the ObjectConstructor common static methods
  // that mutate the target object
  // -----------------------------------------------------------------

  interface ObjectConstructor {
    defineProperty<
      T extends object,
      PROP extends PropertyKey,
      DESC extends PropertyDescriptor,
    >(
      target: T,
      key: PROP,
      descriptor: DESC,
    ): asserts target is T & DefineProperty<PROP, DESC>

    assign<
      T extends object,
      SOURCES extends object[],
    >(
      target: T,
      ...sources: SOURCES,
    ): asserts target is T & MergeTuple<SOURCES>
  }
}

// -----------------------------------------------------------------
// fixed define property types
// source: https://oida.dev/typescript-assertion-signatures/
// -----------------------------------------------------------------

type InferDescriptor<PROP extends PropertyKey, DESC extends PropertyDescriptor> = (
  /* eslint-disable @stylistic/indent */

  DESC extends { get(): any, value: any } ? never :
  DESC extends { value: infer R } ? { [K in PROP]: R } :
  DESC extends { get(): infer R } ? { [K in PROP]: R } :
  never

  /* eslint-enable @stylistic/indent */
)

type DefineProperty<PROP extends PropertyKey, DESC extends PropertyDescriptor> = (
  /* eslint-disable @stylistic/indent */

  DESC extends { writable: any, set(val: any): any } ? never :
  DESC extends { writable: any, get(): any } ? never :
  DESC extends { get(): any, set(val: any): any } ? InferDescriptor<PROP, DESC> :
  DESC extends { get(): any } ? Readonly<InferDescriptor<PROP, DESC>> :
  DESC extends { writable: false } ? Readonly<InferDescriptor<PROP, DESC>> :
  DESC extends { writable: true } ? InferDescriptor<PROP, DESC> :
  Readonly<InferDescriptor<PROP, DESC>>

  /* eslint-enable @stylistic/indent */
)
