/**
 * an `Any` type that will not pollute every Maybe<Any> Type
 *
 * beause `T & any` will always result in only `any` and remove `T`,
 * but `T & Any` will stay as is and will not remove T
 *
 * mostly usefull when only a kind of truthy/falsy value is needed
 */
export type Any = (
  ((...args: any[]) => any)
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
