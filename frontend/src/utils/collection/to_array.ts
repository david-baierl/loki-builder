import { collect } from './collect'
import { Collectable } from './types'

export function to_array<T>(collection: Collectable<T>) {
  if (Array.isArray(collection)) return collection
  return [...collect(collection)]
}
