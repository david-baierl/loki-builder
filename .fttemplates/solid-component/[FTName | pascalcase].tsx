import { JSX } from 'solid-js'
import {
  cx,
  CXProp,
} from '~utils/cx'
import { from_proxy } from '~utils/proxy'

import { css } from '@linaria/core'

// ----------------------------------------------------
// styles
// ----------------------------------------------------

const conatiner_class = css`
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
  const { children, class: cx_class } = from_proxy(props)

  return (
    <div class={cx(conatiner_class, cx_class())}>
      {children()}
    </div>
  )
}
