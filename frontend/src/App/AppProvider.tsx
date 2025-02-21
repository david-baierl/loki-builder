import { ParentProps } from 'solid-js'
import { Provide } from '~utils/Provide'
import { from_proxy } from '~utils/proxy'

import { LocaleProvider } from '@ark-ui/solid'

export function AppProvider(props: ParentProps) {
  const { children } = from_proxy(props)

  return (
    <Provide layers={[
      p => <LocaleProvider locale="de-DE" {...p} />,
    ]}>
      {children()}
    </Provide>
  )
}
