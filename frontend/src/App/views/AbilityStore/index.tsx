import { rem } from '~/styles'
import { use } from '~utils/use'

import { css } from '@linaria/core'

import { ModifierCircle } from './ModifierCircle'
import { ScoreInput } from './ScoreInput'

// ----------------------------------------------------
// styles
// ----------------------------------------------------

// @TODO: cleanup styles with design system

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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${rem(8)};
`

const name_class = css`
  text-transform: uppercase;
`

// ----------------------------------------------------
// properties
// ----------------------------------------------------

interface AbilityScoreProps {
  name: string
  score: number
}

// ----------------------------------------------------
// component
// ----------------------------------------------------

export function AbilityScore(props: AbilityScoreProps) {
  const { name, score } = use(props)

  return (
    <div class={container_class}>
      <div class={name_class}>
        {name()}
      </div>

      <div class={wrapper_class}>
        <ModifierCircle score={score()} />
        <ScoreInput onChange={() => { /* magic */ }} value={score()} />
      </div>
    </div>
  )
}
