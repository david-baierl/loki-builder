import './App.css'

import Palette from '@debug/palette'
import {
  commands,
  events,
} from '@tauri'
import { default_value } from '@utils/directives'
import {
  forwardRef,
  ForwardRef,
} from '@utils/forward-ref'
import { signal } from '@utils/signals'

// use:directives
default_value

function MyInput(props: ForwardRef<HTMLInputElement>) {
  const forwarded = forwardRef(props)
  return <input {...forwarded} />
}

export function App() {
  const greetMsg = signal('')
  const name = signal('')

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    greetMsg.set(await commands.greet(name()))
    await events.demoEvent.emit('hello event')
  }

  return (
    <main class="container">

      <input use:default_value on:change={() => console.log('native')} />
      <MyInput use:default_value on:change={() => console.log('custom')} />

      <Palette />
      <form
        class="row"
        onSubmit={(e) => {
          e.preventDefault()
          greet()
        }}
      >
        <input
          id="greet-input"
          onChange={e => name.set(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg()}</p>
    </main>
  )
}
