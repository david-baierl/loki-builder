import { ParentProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { type as os_type } from '@tauri-apps/plugin-os'
import { fromProxy } from '@utils/proxy'

import { MacOSFrame } from './macos'
import { WindowsFrame } from './windows'

function get_frame() {
  switch (os_type()) {
    case 'macos':
      return MacOSFrame
    case 'windows':
    default:
      return WindowsFrame
  }
}

export function WindowFrame(props: ParentProps) {
  const { children } = fromProxy(props)

  return (
    <Dynamic component={get_frame()}>
      {children()}
    </Dynamic>
  )
}
