import { Some } from '~utils/types'

import { collect } from './collect'
import { Repeatable } from './repeatable'
import { Collectable } from './types'

// ---------------------------------------------
// types
// ---------------------------------------------

export type Collector<T, R> = (value: Some<T>) => Collectable<R>
type CollectorChain<T, R> = (
  | [Collector<T, any>, ...Collector<any, any>[], Collector<any, R>]
  | [Collector<T, R>]
  | []
)

// ---------------------------------------------
// core
// ---------------------------------------------

export function* _map<T, R = T>(
  collection: Collectable<T>,
  ...collectors: CollectorChain<T, R>
): Iterable<Some<R>, void, unknown> {
  const [collector, ...others] = collectors

  if (!collector) {
    yield* collect(collection as Collectable<R>)
    return
  }

  for (const element of collect(collection)) {
    yield* _map(collector(element), ...others as CollectorChain<any, R>)
  }
}

// ---------------------------------------------
// overloads
// ---------------------------------------------

export function map<T>(
  collection: Collectable<T>
): Repeatable<Some<T>, void, unknown>

export function map<T, R>(
  collection: Collectable<T>,
  collector_r: Collector<T, R>
): Repeatable<Some<R>, void, unknown>

export function map<T, A, R>(
  collection: Collectable<T>,
  collector_a: Collector<T, A>,
  collector_r: Collector<A, R>,
): Repeatable<Some<R>, void, unknown>

export function map<T, A, B, R>(
  collection: Collectable<T>,
  collector_a: Collector<T, A>,
  collector_b: Collector<A, B>,
  collector_R: Collector<B, R>,
): Repeatable<Some<R>, void, unknown>

export function map<T, A, B, C, R>(
  collection: Collectable<T>,
  collector_a: Collector<T, A>,
  collector_b: Collector<A, B>,
  collector_c: Collector<B, C>,
  collector_r: Collector<C, R>,
): Repeatable<Some<R>, void, unknown>

export function map<T, A, B, C, D, R>(
  collection: Collectable<T>,
  collector_a: Collector<T, A>,
  collector_b: Collector<A, B>,
  collector_c: Collector<B, C>,
  collector_d: Collector<C, D>,
  collector_r: Collector<D, R>,
): Repeatable<Some<R>, void, unknown>

export function map<T, A, B, C, D, E, R>(
  collection: Collectable<T>,
  collector_a: Collector<T, A>,
  collector_b: Collector<A, B>,
  collector_c: Collector<B, C>,
  collector_d: Collector<C, D>,
  collector_e: Collector<D, E>,
  collector_r: Collector<E, R>,
): Repeatable<Some<R>, void, unknown>

export function map<T, A, B, C, D, E, F, R>(
  collection: Collectable<T>,
  collector_a: Collector<T, A>,
  collector_b: Collector<A, B>,
  collector_c: Collector<B, C>,
  collector_d: Collector<C, D>,
  collector_e: Collector<D, E>,
  collector_f: Collector<E, F>,
  collector_r: Collector<F, R>,
): Repeatable<Some<R>, void, unknown>

export function map<T, A, B, C, D, E, F, G, R>(
  collection: Collectable<T>,
  collector_a: Collector<T, A>,
  collector_b: Collector<A, B>,
  collector_c: Collector<B, C>,
  collector_d: Collector<C, D>,
  collector_e: Collector<D, E>,
  collector_f: Collector<E, F>,
  collector_g: Collector<F, G>,
  collector_r: Collector<G, R>,
): Repeatable<Some<R>, void, unknown>

export function map<T, A, B, C, D, E, F, G, H, R>(
  collection: Collectable<T>,
  collector_a: Collector<T, A>,
  collector_b: Collector<A, B>,
  collector_c: Collector<B, C>,
  collector_d: Collector<C, D>,
  collector_e: Collector<D, E>,
  collector_f: Collector<E, F>,
  collector_g: Collector<F, G>,
  collector_h: Collector<G, H>,
  collector_r: Collector<H, R>,
): Repeatable<Some<R>, void, unknown>

export function map<T, R>(
  collection: Collectable<T>,
  ...collectors: CollectorChain<T, R>
): Repeatable<Some<R>, void, unknown>

// ---------------------------------------------
// implementation
// ---------------------------------------------

export function map<T, R = T>(
  collection: Collectable<T>,
  ...collectors: CollectorChain<T, R>
) {
  return new Repeatable(() => _map(collection, ...collectors))
}
