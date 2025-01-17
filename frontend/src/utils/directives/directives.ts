import {
  Accessor,
  JSX,
} from 'solid-js'

import { default_value } from './default_value'

type Directive<E extends Element, V> = (element: E, accessor: Accessor<V>) => void

/**
 * @warn for our forwardRef feature, we need to provide all directives
 * so the forward ref function can call them manual
 */
export const directives: Record<
  keyof JSX.Directives | keyof JSX.DirectiveFunctions,
  Directive<any, any>
> = {
  default_value,
}
