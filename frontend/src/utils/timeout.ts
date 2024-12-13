import { Task } from './result'

export function sleep(ms: number = 0) {
  return new Promise<void>(resolve => window.setTimeout(resolve, ms))
}

export class TimeoutError extends Error {
  constructor(ms: number, options?: ErrorOptions) {
    super(`E_TIMEOUT: exceeded ${ms}ms`, options)
  }
}

export function timeout<T, E = unknown>(
  task: Task<T, E>,
  ms: number = 5_000,
): Task<T, TimeoutError | E> {
  return Promise.race<[
    Task<T, E>,
    Task<never, TimeoutError>,
  ]>([
    task,
    sleep(ms).then(() => [new TimeoutError(ms)]),
  ])
}
