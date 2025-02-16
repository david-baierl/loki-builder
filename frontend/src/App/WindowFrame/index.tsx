import { ParentProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { from_proxy } from '~utils/proxy'

import { type as os_type } from '@tauri-apps/plugin-os'

import { MacOSFrame } from './MacOSFrame'
import { WindowsOSFrame } from './WindowsOSFrame'

function get_frame() {
  switch (os_type()) {
    case 'macos':
      return MacOSFrame
    case 'windows':
    default:
      return WindowsOSFrame
  }
}

export function WindowFrame(props: ParentProps) {
  const { children } = from_proxy(props)

  return (
    <Dynamic component={get_frame()}>
      {children()}
    </Dynamic>
  )
}
