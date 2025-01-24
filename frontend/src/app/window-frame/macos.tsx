import { ParentProps } from 'solid-js'

import { css } from '@linaria/core'
import { fromProxy } from '@utils/proxy'

const conatiner = css`
  // @TODO
`

export function MacOSFrame(props: ParentProps) {
  const { children } = fromProxy(props)

  return (
    <div class={conatiner}>
      macos
      {children()}
    </div>
  )
}
