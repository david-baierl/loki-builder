import { rem } from '~/styles'

import { css } from '@linaria/core'

import { AbilityScore } from './AbilityStore'

const container_class = css`
  background-color: var(--surface-base);
  width: 100%;
  height: 100%;
  padding: ${rem(16)};
  gap: ${rem(16)};
  overflow: auto;
`

const column_class = css`
  display: flex;
  flex-direction: row;
  gap: ${rem(16)};
`

const row_class = css`
  display: flex;
  flex-direction: column;
  gap: ${rem(16)};
`

export function Home() {
  return (
    <div class={container_class}>
      <div class={column_class}>
        <div class={row_class}>
          <AbilityScore score={17} name="Strength" />
          <AbilityScore score={14} name="Dexterity" />
          <AbilityScore score={14} name="Constitution" />
        </div>
        <div class={row_class}>
          <AbilityScore score={8} name="Intelligence" />
          <AbilityScore score={12} name="Wisdom" />
          <AbilityScore score={10} name="Charisma" />
        </div>
      </div>
    </div>
  )
}
