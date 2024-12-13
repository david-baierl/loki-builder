import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  EffectFunction,
  MemoOptions,
  Setter,
  Signal as SolidSignal,
} from 'solid-js'

// ---------------------------------------------
// type
// ---------------------------------------------

export type SignalGetter<T> = Accessor<T> & {
  get: Accessor<T>
  readonly value: T
}

export type SignalSetter<T> = Setter<T> & {
  set: Setter<T>

  // writeonly
  set value(value: T)
  get value(): never | undefined
}

export type Signal<T> = (
  Accessor<T>
  & [
    getter: SignalGetter<T>,
    setter: SignalSetter<T>,
  ]
  & {
    get: SignalGetter<T>
    set: SignalSetter<T>
    value: T
  }
)

// ---------------------------------------------
// signal
// ---------------------------------------------

export function mutateSetter<T>(setter: Setter<T>): asserts setter is SignalSetter<T> {
  Object.defineProperty(setter, 'value', {
    enumerable: true,
    set: setter,
  })

  Object.assign(setter, {
    set: setter,
  })
}

export function mutateGetter<T>(getter: Accessor<T>): asserts getter is SignalGetter<T> {
  Object.defineProperty(getter, 'value', {
    enumerable: true,
    get: getter,
  })

  Object.assign(getter, {
    get: getter,
  })
}

function mutateSignal<T>(
  accessor: Accessor<T>,
  getter: SignalGetter<T>,
  setter: SignalSetter<T>,
): asserts accessor is Signal<T> {
  Object.defineProperty(accessor, 'value', {
    enumerable: true,
    get: getter,
    set: setter,
  })

  Object.assign(accessor, {
    [Symbol.iterator]: function*() {
      yield * [getter, setter] as const
    },
    get: getter,
    set: setter,
  })
}

export function toSignal<T>(signal: SolidSignal<T>): Signal<T> {
  const [getter, setter] = signal

  mutateSetter(setter)
  mutateGetter(getter)

  // wrap getter in a new reference
  const _signal: Accessor<T> = () => getter()
  mutateSignal(_signal, getter, setter)

  return _signal
}

export function signal<T>(init: T): Signal<T> {
  return toSignal(createSignal(init))
}

// ---------------------------------------------
// memo
// ---------------------------------------------

export function memo<Next extends Prev, Prev = Next>(
  fn: EffectFunction<undefined | NoInfer<Prev>, Next>
): SignalGetter<Next>

export function memo<Next extends Prev, Init = Next, Prev = Next>(
  fn: EffectFunction<Init | Prev, Next>,
  value: Init,
  options?: MemoOptions<Next>
): SignalGetter<Next>

export function memo<Next extends Prev, Init, Prev>(
  fn: EffectFunction<Init | Prev | undefined, Next>,
  value?: Init,
  options?: MemoOptions<Next>,
): SignalGetter<Next> {
  const getter = createMemo(fn, value, options)
  mutateGetter(getter)

  return getter
}

// ---------------------------------------------
// misc
// ---------------------------------------------

// shorter aliases
export {
  createEffect as effect,
}