import { ParentProps } from 'solid-js'
import { from_proxy } from '~utils/proxy'

import { LocaleProvider } from '@ark-ui/solid'

export function AppProvider(props: ParentProps) {
  const { children } = from_proxy(props)

  return (
    <LocaleProvider locale="de-DE">
      {children()}
    </LocaleProvider>
  )
}
