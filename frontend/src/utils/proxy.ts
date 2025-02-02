import {
  _mutate_getter,
  SignalGetter,
} from './signals'

export type SignalGetters<T extends object> = {
  [K in keyof T]-?: SignalGetter<T[K]>
}

/**
 * @warn
 * - never add or remove properties dynamically. \
 *   to remove a value: use `undefined` instead. \
 *   otherwise reactivity will break
 *
 * @example
 * ```tsx
 * const { foo, bar, ...others } = from_proxy(props)
 * ```
 */
export function from_proxy<T extends object>(props: T): SignalGetters<T> {
  return new Proxy(props, {
    get(obj, key) {
      const getter = () => obj[key as keyof typeof obj]
      _mutate_getter(getter)

      return getter
    },
  }) as SignalGetters<T>
}

/**
 * @warn
 * - only use this inside JSX ¯\\_(ツ)_/¯ don't ask why
 *   - spreading properties are only realy reactive in JSX
 * - never add or remove properties dynamically. \
 *   to remove a value: use `undefined` instead. \
 *   otherwise reactivity will break
 *
 * @example
 * ```tsx
 * return <Child {...to_proxy(props)} />
 * ```
 */
export function to_proxy<T extends object>(props: SignalGetters<T>): T {
  return new Proxy(props, {
    get(obj, key) {
      return obj[key as keyof typeof obj]?.()
    },
  }) as T
}
