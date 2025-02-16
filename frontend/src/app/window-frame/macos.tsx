import { ParentProps } from 'solid-js'
import { from_proxy } from '~utils/proxy'

import { css } from '@linaria/core'

const conatiner = css`
  // @TODO
`

export function MacOSFrame(props: ParentProps) {
  const { children } = from_proxy(props)

  return (
    <div class={conatiner}>
      macos
      {children()}
    </div>
  )
}
