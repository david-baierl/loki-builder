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

export interface SignalGetter<T> extends Accessor<T> {

  /** @hint this is tracked */
  get: Accessor<T>

  /** @hint this is untracked */
  peek: Accessor<T>

  /** @hint this is tracked */
  readonly value: T
}

export interface SignalSetter<T> extends Setter<T> {
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
export function _mutate_getter<T>(
  getter: Accessor<T>,
): asserts getter is SignalGetter<T> {
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
function _mutate_setter<T>(
  getter: Accessor<T>,
  setter: Setter<T>,
): asserts setter is SignalSetter<T> {
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
function _mutate_signal<T>(
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

export function to_signal<T>(signal: SolidSignal<T>): Signal<T> {
  const [getter, setter] = signal

  _mutate_setter(getter, setter)
  _mutate_getter(getter)

  const _signal: Accessor<T> = () => getter()
  _mutate_signal(_signal, getter, setter)

  return _signal
}

export function signal<T>(init: T, options?: SignalOptions<T>): Signal<T>
export function signal<T>(init?: undefined, options?: SignalOptions<T>): Signal<T | undefined>
export function signal<T>(init?: T, options?: SignalOptions<T>): Signal<T> {
  return to_signal(createSignal(init as T, options))
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
  _mutate_getter(getter)

  return getter
}

// ---------------------------------------------
// misc
// ---------------------------------------------

// shorter aliases
export {
  createEffect as effect,
}
