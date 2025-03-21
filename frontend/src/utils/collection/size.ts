import { collect } from './collect'
import { Collectable } from './types'

export function size(collection: Collectable<any>) {
  if (Array.isArray(collection)) return collection.length
  if (collection instanceof Map || collection instanceof Set) return collection.size

  // slow count
  let i = 0
  for (const {} of collect(collection)) {
    i++
  }
  return i
}
