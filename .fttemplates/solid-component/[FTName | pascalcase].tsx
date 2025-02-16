import { JSX } from 'solid-js'
import { from_proxy } from '~utils/proxy'

import { css } from '@linaria/core'

const conatiner = css`
  // @TODO
`

interface [FTName | pascalcase]Props {
  children?: JSX.Element
}

export function [FTName | pascalcase](props: [FTName | pascalcase]Props) {
  const { children } = from_proxy(props)

  return (
    <div class={conatiner}>
      {children()}
    </div>
  )
}
