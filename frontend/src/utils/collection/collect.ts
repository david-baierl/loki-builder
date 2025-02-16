import { Repeatable } from './repeatable'
import { Collectable } from './types'

function is_iterable<T>(collection: any): collection is Iterable<T> {
  return typeof collection?.[Symbol.iterator] === 'function'
}

function normalize<T>(collection: Collectable<T>) {
  if (collection === null || collection === undefined) return []
  if (collection instanceof Map || collection instanceof Set) return collection.values()
  if (typeof collection === 'string') return [collection]
  if (is_iterable<T>(collection)) return collection
  return [collection]
}

function* _collect<T>(...collections: Collectable<T>[]) {
  for (const collection of collections) {
    for (const element of normalize(collection)) {
      if (element === null || element === undefined) continue
      yield element
    }
  }
}

export function collect<T>(...collections: Collectable<T>[]) {
  return new Repeatable(() => _collect(...collections))
}
