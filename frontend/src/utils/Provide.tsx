import {
  JSX,
  ParentComponent,
} from 'solid-js'
import { Dynamic } from 'solid-js/web'

// ----------------------------------------------------
// properties
// ----------------------------------------------------

export type ProviderComponent = ParentComponent

interface ProvideProps {
  layers: ProviderComponent[]
  children?: JSX.Element
}

// ----------------------------------------------------
// component
// ----------------------------------------------------

export function Provide(props: ProvideProps) {
  return props.layers.reduceRight<JSX.Element>((children, Component) => {
    return <Dynamic component={Component} children={children} />
  }, props.children)
}
