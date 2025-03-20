import { ParentProps } from 'solid-js'
import { from_proxy } from '~utils/proxy'

import { css } from '@linaria/core'

const container = css`
  width: 100%;
  height: 100%;
`

export function MacOSFrame(props: ParentProps) {
  const { children } = from_proxy(props)

  return (
    <div class={container}>
      {children()}
    </div>
  )
}
