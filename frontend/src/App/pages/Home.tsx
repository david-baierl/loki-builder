import { rem } from '~/styles'

import { css } from '@linaria/core'

import { AbillityScore } from './AbillityStore'

const container_class = css`
  background-color: var(--surface-base);
  width: 100%;
  height: 100%;
  padding: ${rem(16)};
  gap: ${rem(16)};
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
          <AbillityScore score={17} name="Strength" />
          <AbillityScore score={14} name="Dexterity" />
          <AbillityScore score={14} name="Constitution" />
        </div>
        <div class={row_class}>
          <AbillityScore score={8} name="Intelligence" />
          <AbillityScore score={12} name="Wisdom" />
          <AbillityScore score={10} name="Charisma" />
        </div>
      </div>
    </div>
  )
}
