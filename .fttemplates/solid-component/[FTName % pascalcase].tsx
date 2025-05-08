import { JSX } from 'solid-js'
import {
  cx,
  CXProp,
} from '~utils/cx'
import { use } from '~utils/use'

import { css } from '@acab/ecsstatic'

// ----------------------------------------------------
// styles
// ----------------------------------------------------

const container_class = css`
  // @TODO
`

// ----------------------------------------------------
// properties
// ----------------------------------------------------

interface [FTName | pascalcase]Props extends CXProp {
  children?: JSX.Element
}

// ----------------------------------------------------
// component
// ----------------------------------------------------

export function [FTName | pascalcase](props: [FTName | pascalcase]Props) {
  const { children, class: cx_class } = use(props)

  return (
    <div class={cx(container_class, cx_class())}>
      {children()}
    </div>
  )
}
