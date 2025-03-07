import { rem } from '~/styles'
import {
  cx,
  CXProp,
} from '~utils/cx'
import { from_proxy } from '~utils/proxy'

import { css } from '@linaria/core'

// ----------------------------------------------------
// styles
// ----------------------------------------------------

// @TODO: cleanup styles with design system

export const MOD_DIAMETER = 80

const conatinerClass = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${rem(MOD_DIAMETER)};
  height: ${rem(MOD_DIAMETER)};
  border-radius: 50%;
  background: var(--surface-crust);
  font-size: ${rem(28)};
  border: 3px solid var(--color-gray-800);
`

// ----------------------------------------------------
// properties
// ----------------------------------------------------

interface ModifierCircleProps extends CXProp {
  score: number
}

// ----------------------------------------------------
// component
// ----------------------------------------------------

export function ModifierCircle(props: ModifierCircleProps) {
  const { class: cx_class, score } = from_proxy(props)

  const modifier = () => Math.floor((score() - 10) / 2)
  const as_string = () => {
    const _modifier = modifier()
    if (!_modifier) return 0

    return `${_modifier > 0 ? '+' : ''}${_modifier.toString()}`
  }

  return (
    <div class={cx(conatinerClass, cx_class())}>
      {as_string()}
    </div>
  )
}
