import { Accessor } from 'solid-js'

export type Accessors<T extends object> = {
  [K in keyof T]-?: Accessor<T[K]>
}

export type DeepAccessors<T> = {
  /* eslint-disable @stylistic/indent */
  [K in keyof T]-?: (

    T[K] extends any[] ? Accessor<T[K]>
    : T[K] extends (...args: any[]) => any ? Accessor<T[K]>
    : T[K] extends object ? DeepAccessors<T[K]> & Accessor<T[K]>
    : T[K] extends (object | undefined) ? DeepAccessors<Partial<T[K]>> & Accessor<T[K]>
    : Accessor<T[K]>

  )
  /* eslint-enable @stylistic/indent */
}

function _from_deep_proxy<T>(source: Accessor<T>) {
  const get = (key: keyof T): any => {
    if (key in source) return source[key as keyof Accessor<T>]
    return _from_deep_proxy(() => source()?.[key as keyof T])
  }

  return new Proxy(source, {
    get(_, key) {
      return get(key as keyof T)
    },
    ownKeys() {
      const value = source()
      if (value && typeof value === 'object') return Object.keys(value)
      return []
    },
    getOwnPropertyDescriptor(_, key) {
      return { configurable: true, enumerable: true, value: get(key as keyof T) }
    },
  }) as DeepAccessors<T> & Accessor<T>
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
export function from_proxy<T extends object>(props: T): DeepAccessors<T> {
  return _from_deep_proxy(() => props)
}

/**
 * @warn
 * - only use this inside JSX ¯\\_(ツ)_/¯ don't ask why
 *   - spreading properties are only really reactive in JSX
 * - never add or remove properties dynamically. \
 *   to remove a value: use `undefined` instead. \
 *   otherwise reactivity will break
 *
 * @example
 * ```tsx
 * return <Child {...to_proxy(props)} />
 * ```
 */
export function to_proxy<T extends object>(props: Accessors<T>): T {
  return new Proxy(props, {
    get(obj, key) {
      return obj[key as keyof typeof obj]?.()
    },
  }) as T
}
