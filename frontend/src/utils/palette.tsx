import { For } from 'solid-js'

import { Tooltip as ArkTooltip } from '@ark-ui/solid/tooltip'
import { Portal } from 'solid-js/web'

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

export const Color = (props: ColorProps) => (
  <ArkTooltip.Root>
    <ArkTooltip.Trigger
      style={{
        'border-radius': '0',
        'padding': '0',
        'width': '24px',
        'height': '24px',
        'background-color': `var(--color-${props.name})`,
      }}
    />
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
  </ArkTooltip.Root>
)

function Palette() {
  return (
    <div
      style={{
        'display': 'flex',
        'flex-direction': 'column',
        'margin': '16px auto',
        'gap': '8px',
      }}
    >
      <div
        style={{
          'display': 'flex',
          'padding-left': '64px',
          'gap': '8px',
        }}
      >
        <For each={shade_names}>{name => <Color name={name} />}</For>
      </div>
      <div
        style={{
          'display': 'flex',
          'flex-direction': 'column',
          'gap': '8px',
        }}
      >
        <For each={color_names}>
          {color_name => (
            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
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
