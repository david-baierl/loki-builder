import {
  For,
  Show,
} from 'solid-js'
import { Portal } from 'solid-js/web'

import { css } from '@acab/ecsstatic'
import {
  Tooltip as ArkTooltip,
  useTooltip,
} from '@ark-ui/solid/tooltip'

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

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

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
          'flex-direction': 'column',
          'gap': '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '4px',
          }}
        >
          <span style={{ 'text-align': 'right', 'width': '80px' }}>gray</span>
          <For each={shades}>{shade => <Color name={`gray-${shade}`} />}</For>
          <Color name="gray-0" />
        </div>

        <For each={color_names}>
          {color_name => (
            <div
              style={{
                display: 'flex',
                gap: '4px',
              }}
            >
              <span style={{ 'text-align': 'right', 'width': '80px' }}>{color_name}</span>
              <For each={shades}>{shade => <Color name={`${color_name}-${shade}`} />}</For>
              <Color name={`${color_name}-A500`} />
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

export default Palette
