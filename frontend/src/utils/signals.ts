import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  Setter,
  SignalOptions,
  untrack,
} from 'solid-js'

// ---------------------------------------------
// type
// ---------------------------------------------

export interface Signal<T> extends Accessor<T> {
  value: T
  set: Setter<T>
  peek: Accessor<T>
}

// ---------------------------------------------
// signal
// ---------------------------------------------

export function signal<T>(init: T, options?: SignalOptions<T>): Signal<T>
export function signal<T>(init?: undefined, options?: SignalOptions<T>): Signal<T | undefined>
export function signal<T>(init?: T, options?: SignalOptions<T>): Signal<T> {
  const [getter, setter] = createSignal(init as T, options)

  Object.defineProperty(getter, 'value', {
    enumerable: true,
    get: getter,
    // in case the generic T is a function
    // we force the setter to accept it as a value
    // and not as a handle function
    set: (value: T) => setter(() => value),
  })

  Object.assign(getter, {
    peek: () => untrack(getter),
    set: setter,
  })

  return getter
}

// ---------------------------------------------
// misc
// ---------------------------------------------

// shorter aliases
export {
  createEffect as effect,
  createMemo as memo,
}
