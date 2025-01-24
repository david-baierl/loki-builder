import { JSX } from 'solid-js'

import { directives } from '@utils/directives'

export type ForwardRef<E extends Element = Element> = Partial<(
  JSX.DirectiveAttributes &
  JSX.DirectiveFunctionAttributes<E> &
  JSX.OnAttributes<E> &
  JSX.CustomEventHandlersNamespaced<E> &
  JSX.OnCaptureAttributes<E> &

  // wont work because there are empty by default
  // @TODO: fill?
  // JSX.PropAttributes &
  // JSX.AttrAttributes &
  // JSX.BoolAttributes &

  { ref: (element: E) => void }
)>

type ForwardKey<K> = K extends `use:${string}` ? never : (K extends `${string}:${string}` ? K : never)
type ForwardedElement<T extends ForwardRef<any>> = T extends ForwardRef<infer R> ? R : never
type Forwarded<T extends ForwardRef<any>> = (
  { [K in keyof T as ForwardKey<K>]: T[K] } &
  { ref: (element: ForwardedElement<T>) => void }
)

const isForwardableKey = (key: string | symbol) => (
  typeof key === 'string'
  && key !== 'ref'
  && !key.startsWith('use:')
  && key.includes(':')
)

/**
 * will forward every `*:*` property
 *
 * can also manual instantiate custom directives (`use:*`) that are defined in `@utils/directives`
 *
 * @example
 * ```tsx
 * function MyInput(props: ForwardRef<HTMLInputElement>) {
 *   const [ref, setRef] = createSignal<HTMLInputElement>() // optional - will be called before the external setRef
 *   const forwarded = forwardRef(props, setRef)
 *
 *   return <input {...forwarded} />
 * }
 *
 * function Component() {
 *   return <MyInput
 *     ref={input => { ... }} // ref - will be called after the internal setRef
 *     use:model={true} // custom directives
 *     on:click={event => { ... }} // event binding
 *     // ect ...
 *   />
 * }
 * ```
 */
export const forwardRef = <T extends ForwardRef<any>>(
  props: T,
  setRef?: (element: ForwardedElement<T>) => void,
) => {
  const ref = (element: ForwardedElement<T>) => {
    setRef?.(element)
    props.ref?.(element)

    // manually call all directives
    for (const key in props) {
      if (!key.startsWith('use:')) continue
      const name = key.slice(4) as keyof JSX.Directives | keyof JSX.DirectiveFunctions
      directives[name]?.(element, () => props[key])
    }
  }

  return new Proxy(props, {
    get: (obj, key) => {
      if (key === 'ref') return ref
      if (isForwardableKey(key)) return obj[key as keyof T]
    },
    ownKeys: obj => [...Object.keys(obj).filter(isForwardableKey), 'ref'],
    getOwnPropertyDescriptor: (obj, key) => {
      if (key === 'ref') return { configurable: true, enumerable: true, value: ref }
      return Object.getOwnPropertyDescriptor(obj, key)
    },
  }) as Forwarded<T>
}
