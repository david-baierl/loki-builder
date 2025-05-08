import { Repeatable } from './repeatable'

function* _range(start = 0, stop = 0) {
  const direction = start < stop ? 1 : -1

  for (let i = start; i !== stop; i += direction) {
    yield i
  }

  yield stop
}

export function range(start = 0, stop = 0) {
  return new Repeatable(() => _range(start, stop))
}
