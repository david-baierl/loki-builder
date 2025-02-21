import {
  Context as SolidContext,
  createContext as createSolidContext,
  JSX,
  ParentProps,
  useContext,
} from 'solid-js'

import {
  from_proxy,
  SignalGetters,
  to_proxy,
} from './proxy'

type Parent<P> = (props: P & ParentProps) => JSX.Element
type Context<P> = Parent<P> & {
  Partial: Parent<Partial<P>>
  Context: SolidContext<P>
  name: string
}

export function use<P>(context: Context<P>) {
  const provided = useContext(context.Context)
  if (!provided) throw new ReferenceError(context.name)
  return provided
}

export function create_context<P extends object>(name: string, defaultValue: P): Context<P>
export function create_context<P extends object>(name: string, defaultValue?: P): Context<P | undefined>
export function create_context<P extends object>(name: string, defaultValue?: P) {
  const Context = createSolidContext(defaultValue as P, { name })

  const Provider: Context<P> = (props: P & ParentProps) => {
    const { children, ...others } = from_proxy(props)

    return <Context.Provider value={to_proxy(others as SignalGetters<P>)} children={children()} />
  }

  Provider.Context = Context
  Provider.name = name

  Provider.Partial = (props: Partial<P> & ParentProps) => {
    const prev = use(Provider)
    return <Provider {...prev} {...props} />
  }

  return Provider
}
