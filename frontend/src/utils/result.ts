// --------------------------------------------------------------
// types
// --------------------------------------------------------------

export type Ok<T> = [
  error: undefined,
  value: T,
]

export type Err<E = unknown> = [
  error: E,
  value?: undefined,
]

export type Result<T, E = unknown> = Ok<T> | Err<E>
export type Task<T, E = unknown> = Promise<Result<T, E>>

// --------------------------------------------------------------
// helper
// --------------------------------------------------------------

export function ok<T = unknown>(value: T): Ok<T> {
  return [, value]
}

export function err<E = unknown>(error: E): Err<E> {
  return [error]
}

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
