import { For, Show } from 'solid-js'
import { css } from '@linaria/core'

import { Tooltip as ArkTooltip, useTooltip } from '@ark-ui/solid/tooltip'
import { Portal } from 'solid-js/web'

const colorBox = css`
  all: unset;
  width: 24px;
  height: 24px;
`

const color_names = [
  'rosewater',
  'flamingo',
  'pink',
  'mauve',
  'red',
  'maroon',
  'peach',
  'yellow',
  'green',
  'teal',
  'sky',
  'sapphire',
  'blue',
  'lavender',
]

const shade_names = [
  'text',
  'subtext1',
  'subtext0',
  'overlay2',
  'overlay1',
  'overlay0',
  'surface2',
  'surface1',
  'surface0',
  'base',
  'mantle',
  'crust',
]

interface ColorProps {
  name: string
}

function Color(props: ColorProps) {
  const tooltip = useTooltip()

  return (
    <ArkTooltip.RootProvider value={tooltip}>
      <ArkTooltip.Trigger
        class={colorBox}
        style={{
          'background-color': `var(--color-${props.name})`,
        }}
      />
      <Show when={tooltip().open}>
        <Portal>
          <ArkTooltip.Positioner>
            <ArkTooltip.Content
              style={{
                'background-color': 'var(--color-overlay0)',
                'padding': '4px 8px',
              }}
            >
              { `--color-${props.name}` }
            </ArkTooltip.Content>
          </ArkTooltip.Positioner>
        </Portal>
      </Show>
    </ArkTooltip.RootProvider>
  )
}

function Palette() {
  return (
    <div
      style={{
        'display': 'flex',
        'flex-direction': 'column',
        'margin': '16px auto',
        'gap': '4px',
      }}
    >
      <div
        style={{
          'display': 'flex',
          'padding-left': '140px',
          'gap': '4px',
        }}
      >
        <For each={shade_names}>{name => <Color name={name} />}</For>
      </div>
      <div
        style={{
          'display': 'flex',
          'flex-direction': 'column',
          'gap': '4px',
        }}
      >
        <For each={color_names}>
          {color_name => (
            <div
              style={{
                display: 'flex',
                gap: '4px',
              }}
            >
              <span style={{ 'text-align': 'right', 'width': '80px' }}>{color_name}</span>
              <Color name={color_name} />
              <Color name={`${color_name}-bright`} />
              <For each={shade_names}>{shade_name => <Color name={`${color_name}-${shade_name}`} />}</For>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

export default Palette
