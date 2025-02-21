import { Maybe } from '~utils/types'

export type Collection<T> = T[] | Map<any, T> | Set<T> | Iterable<T>
export type Collectable<T> = Maybe<T> | Collection<T>
