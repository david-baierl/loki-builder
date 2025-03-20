// --------------------------------------------------------------
// types
// --------------------------------------------------------------

export type Ok<T> = [
  error: undefined,
  value: T,
]

export type Err<E extends Error = Error> = [
  error: E,
  value?: undefined,
]

export type Result<T, E extends Error = Error> = Ok<T> | Err<E>
export type Task<T, E extends Error = Error> = Promise<Result<T, E>>

// --------------------------------------------------------------
// helper
// --------------------------------------------------------------

// --- ok --- //

export function ok<T>(value: T): Ok<T> {
  return [, value]
}

// --- err --- //

// ensures that error is always of type Error
// otherwise throwing an falsy value could break result type discrimination
export function err<E extends Error>(reason: E): Err<E>
export function err(reason?: unknown): Err<Error>
export function err(reason?: unknown): Err<Error> {
  // error
  // @TODO: Error.isError(reason)
  if (reason instanceof Error) return [reason]

  // string
  if (typeof reason === 'string') return [new Error(reason)]

  // cause fallback
  return [new Error(undefined, { cause: reason })]
}

// --- try --- //

export function try_sync<T>(fn: () => T): Result<T> {
  try {
    return ok(fn())
  }
  catch (error) {
    return err(error)
  }
}

export async function try_async<T>(fn: () => Promise<T>): Task<T> {
  try {
    return ok(await fn())
  }
  catch (error) {
    return err(error)
  }
}
