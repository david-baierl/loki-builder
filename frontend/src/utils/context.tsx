import {
  Context as SolidContext,
  createContext as createSolidContext,
  JSX,
  ParentProps,
  useContext,
} from 'solid-js'

import {
  DeepAccessors,
  from_proxy,
  to_proxy,
} from './proxy'

const CONTEXT_SYMBOL = Symbol('loki.context')

type Parent<P> = (props: P & ParentProps) => JSX.Element

export type Context<P> = Parent<P> & {
  Partial: Parent<Partial<P>>
  [CONTEXT_SYMBOL]: SolidContext<P>
  name: string
}

export type FromContext<T> = T extends Context<infer R> ? R : T

export function use_context<T>(context: Context<T>): T {
  const provided = useContext(context[CONTEXT_SYMBOL])
  if (!provided) throw new ReferenceError(context.name)
  return provided
}

export function is_context(value: unknown): value is Context<any> {
  return typeof value === 'function' && CONTEXT_SYMBOL in value
}

export function create_context<P extends object>(name: string, defaultValue: P): Context<P>
export function create_context<P extends object>(name: string, defaultValue?: P): Context<P | undefined>
export function create_context<P extends object>(name: string, defaultValue?: P) {
  const Context = createSolidContext(defaultValue as P, { name })

  const Provider: Context<P> = (props: P & ParentProps) => {
    const { children, ...others } = from_proxy(props)

    return <Context.Provider value={to_proxy(others as DeepAccessors<P>)} children={children()} />
  }

  Provider[CONTEXT_SYMBOL] = Context
  Provider.name = name

  Provider.Partial = (props: Partial<P> & ParentProps) => {
    const prev = use_context(Provider)
    return <Provider {...prev} {...props} />
  }

  return Provider
}
