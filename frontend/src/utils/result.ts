// --------------------------------------------------------------
// types
// --------------------------------------------------------------

export type Resolved<T> = [
  error: undefined,
  value: T,
]

export type Rejected<E = unknown> = [
  error: E,
  value?: undefined,
]

export type Result<T, E = unknown> = Resolved<T> | Rejected<E>
export type Task<T, E = unknown> = Promise<Result<T, E>>

// --------------------------------------------------------------
// helper
// --------------------------------------------------------------

export function try_sync<T>(fn: () => T): Result<T> {
  try {
    return [, fn()]
  }
  catch (err) {
    return [err]
  }
}

export async function try_async<T>(fn: () => Promise<T>): Task<T> {
  try {
    return [, await fn()]
  }
  catch (err) {
    return [err]
  }
}
