import {
  map,
  to_array,
  to_unique,
} from './collection'
import {
  Context,
  FromContext,
  is_context,
  use_context,
} from './context'
import {
  DeepAccessors,
  from_proxy,
} from './proxy'

type Useable<T extends object = object> = Context<T> | T
type FromUseable<T> = FromContext<T>

type FromUseableTuple<T extends Useable[]> = (
  T extends [ infer HEAD, ...infer TAIL extends Useable[] ] ? (
    TAIL extends [] ? FromUseable<HEAD> : FromUseable<HEAD> & FromUseableTuple<TAIL>
  ) : T
)

type UseReturn<T extends Useable[]> = DeepAccessors<FromUseableTuple<T>>

export function use<T extends Useable[]>(...args: T): UseReturn<T> {
  const normalized: any[] = to_array(map(args, arg => (
    is_context(arg) ? use_context(arg) : arg
  )))

  const getter = (key: string | symbol) => {
    for (let i = normalized.length - 1; i >= 0; i--) {
      const value = normalized[i]?.[key]
      if (value === undefined) continue
      return value
    }
  }

  const proxy = new Proxy({} as FromUseableTuple<T>, {
    get(_, key) {
      return getter(key)
    },
    ownKeys() {
      return to_array(to_unique(map(
        normalized,
        props => Object.keys(props),
      )))
    },
    getOwnPropertyDescriptor(_, key) {
      return { configurable: true, enumerable: true, value: getter(key) }
    },
  })

  return from_proxy(proxy)
}
