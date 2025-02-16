import { rem } from '~/styles'
import { from_proxy } from '~utils/proxy'

import { css } from '@linaria/core'

import {
  MOD_DIAMETER,
  ModifierCircle,
} from './ModifierCircle'
import {
  SCORE_WIDTH,
  ScoreBox,
} from './ScoreBox'

// ----------------------------------------------------
// styles
// ----------------------------------------------------

// @TODO: cleanup styles with design system

const MOD_SCORE_OVERLAP = 8

const container_class = css`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid var(--color-gray-800);
  border-radius: ${rem(16)} ${rem(16)} 0 0;
  padding: ${rem(16)} ${rem(32)};
  gap: ${rem(8)};
  background: var(--surface-crust);
`

const wrapper_class = css`
  position: relative;
  width: ${rem(MOD_DIAMETER + SCORE_WIDTH - MOD_SCORE_OVERLAP)};
`

const modifier_class = css`
  position: relative;
  z-index: 1;
`

const score_class = css`
  position: absolute;
  left: ${rem(MOD_DIAMETER - MOD_SCORE_OVERLAP)};
  bottom: ${rem(12)};
  z-index: 0;
`

const name_class = css`
  text-transform: uppercase;
`

// ----------------------------------------------------
// properties
// ----------------------------------------------------

interface AbillityScoreProps {
  name: string
  score: number
}

// ----------------------------------------------------
// component
// ----------------------------------------------------

export function AbillityScore(props: AbillityScoreProps) {
  const { name, score } = from_proxy(props)

  return (
    <div class={container_class}>
      <div class={name_class}>
        {name()}
      </div>

      <div class={wrapper_class}>
        <ModifierCircle class={modifier_class} score={score()} />
        <ScoreBox class={score_class} score={score()} />
      </div>
    </div>
  )
}
