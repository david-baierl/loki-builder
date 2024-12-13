import {
  mutateGetter,
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
 * const { foo, bar, ...others } = fromProxy(props)
 * ```
 */
export function fromProxy<T extends object>(props: T): SignalGetters<T> {
  return new Proxy(props, {
    get(obj, key) {
      const getter = () => obj[key as keyof typeof obj]
      mutateGetter(getter)

      return getter
    },
  }) as SignalGetters<T>
}

/**
 * @warn
 * - only use this inside JSX ¯\\_(ツ)_/¯ don't ask why
 * - never add or remove properties dynamically. \
 *   to remove a value: use `undefined` instead. \
 *   otherwise reactivity will break
 *
 * @example
 * ```tsx
 * return <Child {...toProxy(props)} />
 * ```
 */
export function toProxy<T extends object>(props: SignalGetters<T>): T {
  return new Proxy(props, {
    get(obj, key) {
      return obj[key as keyof typeof obj]?.()
    },
  }) as T
}
