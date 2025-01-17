import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  EffectFunction,
  MemoOptions,
  Setter,
  Signal as SolidSignal,
  SignalOptions,
  untrack,
} from 'solid-js'

// ---------------------------------------------
// type
// ---------------------------------------------

export type SignalGetter<T> = Accessor<T> & {

  /** @hint this is tracked */
  get: Accessor<T>

  /** @hint this is untracked */
  peek: Accessor<T>

  /** @hint this is tracked */
  readonly value: T
}

export type SignalSetter<T> = Setter<T> & {
  set: Setter<T>

  /** @hint this is untracked */
  value: T
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

    /** @hint this is untracked */
    peek: Accessor<T>

    /**
     * @hint this is tracked
     *
     * @warn do not read and write in the same spot
     *
     * - `signal.value++` is causing an tracked 'read' signal
     *    and will cause infinit effect loops
     *
     * - use `signal.set.value++` instead,
     *   this is equivalent to `signal.set(v => v + 1)`
     */
    value: T
  }
)

// ---------------------------------------------
// signal
// ---------------------------------------------

/** @internal */
export function _mutateGetter<T>(getter: Accessor<T>): asserts getter is SignalGetter<T> {
  Object.defineProperty(getter, 'value', {
    enumerable: true,
    get: getter,
  })

  Object.assign(getter, {
    peek: () => untrack(getter),
    get: getter,
  })
}

/** @internal */
function _mutateSetter<T>(getter: Accessor<T>, setter: Setter<T>): asserts setter is SignalSetter<T> {
  Object.defineProperty(setter, 'value', {
    enumerable: true,
    get: () => untrack(getter),
    set: setter,
  })

  Object.assign(setter, {
    set: setter,
  })
}

/** @internal */
function _mutateSignal<T>(
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
    peek: () => untrack(getter),
    get: getter,
    set: setter,
  })
}

export function toSignal<T>(signal: SolidSignal<T>): Signal<T> {
  const [getter, setter] = signal

  _mutateSetter(getter, setter)
  _mutateGetter(getter)

  // wrap getter in a new reference
  const _signal: Accessor<T> = () => getter()
  _mutateSignal(_signal, getter, setter)

  return _signal
}

export function signal<T>(init: T, options?: SignalOptions<T>): Signal<T>
export function signal<T>(init?: undefined, options?: SignalOptions<T>): Signal<T | undefined>
export function signal<T>(init?: T, options?: SignalOptions<T>): Signal<T> {
  return toSignal(createSignal(init as T, options))
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
  _mutateGetter(getter)

  return getter
}

// ---------------------------------------------
// misc
// ---------------------------------------------

// shorter aliases
export {
  createEffect as effect,
}
