import { rem } from '~/styles'
import {
  cx,
  CXProp,
} from '~utils/cx'
import {
  forward_ref,
  ForwardRef,
} from '~utils/forward_ref'
import { use } from '~utils/use'

import {
  NumberInput,
  NumberInputValueChangeDetails,
} from '@ark-ui/solid/number-input'
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
  border: ${rem(2)} var(--color-gray-800) solid;
  background-color: var(--surface-crust);
`

const input_class = css`
  flex: 1 1 auto;
`

// ----------------------------------------------------
// properties
// ----------------------------------------------------

interface ScoreInputProps extends CXProp, ForwardRef<HTMLInputElement> {
  value: number
  onChange: (value: NumberInputValueChangeDetails) => void

  // forwarding
  input?: NumberInput.InputProps
  root?: NumberInput.RootProps & { class: string }
}

// ----------------------------------------------------
// component
// ----------------------------------------------------

export function ScoreInput(props: ScoreInputProps) {
  const forwarded = forward_ref(props)
  const {
    value,
    onChange,
    class: cx_class,

    input,
    root,
  } = use(props)

  return (
    <NumberInput.Root
      min={8}
      max={15}
      onValueChange={onChange()}
      value={value().toString()}
      {...root()}
      class={cx(container_class, cx_class(), root.class())}
    >

      <NumberInput.Input
        {...forwarded}
        {...input()}
        class={cx(input_class, input.class())}
      />

      <NumberInput.Control>
        <NumberInput.DecrementTrigger>-</NumberInput.DecrementTrigger>
        <NumberInput.IncrementTrigger>+</NumberInput.IncrementTrigger>
      </NumberInput.Control>
    </NumberInput.Root>
  )
}
