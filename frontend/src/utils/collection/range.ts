import { Repeatable } from './repeatable'

function* _range(start = 0, stop = 0) {
  for (let i = start; i <= stop; i++) {
    yield i
  }
}

export function range(start = 0, stop = 0) {
  return new Repeatable(() => _range(start, stop))
}
