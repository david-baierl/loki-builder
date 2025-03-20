import { collect } from './collect'
import { Collectable } from './types'

export function to_unique<T>(collection: Collectable<T>) {
  if (collection instanceof Set) return collection
  return new Set(collect(collection))
}
