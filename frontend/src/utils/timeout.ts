import {
  err,
  Task,
} from './result'

export function sleep(ms: number = 0) {
  return new Promise<void>(resolve => (
    window.setTimeout(resolve, ms)
  ))
}

export class TimeoutError extends Error {
  constructor(ms: number, options?: ErrorOptions) {
    super(`E_TIMEOUT: exceeded ${ms}ms`, options)
  }
}

export function timeout<T, E extends Error = Error>(
  task: Task<T, E>,
  ms: number = 5_000,
): Task<T, TimeoutError | E> {
  type _Race = [
    Task<T, E>,
    Task<never, TimeoutError>,
  ]

  return Promise.race<_Race>([
    task,
    sleep(ms).then(() => err(new TimeoutError(ms))),
  ])
}
