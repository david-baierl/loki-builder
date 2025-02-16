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

export const SCORE_WIDTH = 80
export const SCORE_HEIGHT = 48

const container_class = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${rem(SCORE_WIDTH)};
  height: ${rem(SCORE_HEIGHT)};
`

const svg_class = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  fill: var(--surface-crust);
  stroke: var(--color-gray-800);
  stroke-width: 3px;
`

const text_class = css`
  position: relative;
  z-index: 0;
  font-size: ${rem(18)};
`

// ----------------------------------------------------
// properties
// ----------------------------------------------------

interface TrapeziodProps extends CXProp {
  score: number
}

// ----------------------------------------------------
// component
// ----------------------------------------------------

export function ScoreBox(props: TrapeziodProps) {
  const { score, class: cx_class } = from_proxy(props)

  return (
    <div class={cx(container_class, cx_class())}>
      <svg
        class={svg_class}
        viewBox={`0 0 ${SCORE_WIDTH}${SCORE_HEIGHT}`}
        width={SCORE_WIDTH}
        height={SCORE_HEIGHT}
      >
        <path d={`M0,0 L${SCORE_WIDTH * 0.9},0 L${SCORE_WIDTH},${SCORE_HEIGHT} L0,${SCORE_HEIGHT}z`} />
      </svg>

      <span class={text_class}>{score()}</span>
    </div>
  )
}
