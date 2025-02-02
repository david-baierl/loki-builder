import { ParentProps } from 'solid-js'

import { css } from '@linaria/core'
import { from_proxy } from '@utils/proxy'

const conatiner = css`
  // @TODO
`

export function WindowsFrame(props: ParentProps) {
  const { children } = from_proxy(props)

  return (
    <div class={conatiner}>
      windows
      {children()}
    </div>
  )
}
