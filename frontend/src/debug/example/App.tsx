import './App.css'

import Palette from '~debug/palette'
import {
  commands,
  events,
} from '~tauri'
import { default_value } from '~utils/directives'
import {
  forward_ref,
  ForwardRef,
} from '~utils/forward_ref'
import { signal } from '~utils/signals'

// use:directives
default_value

function MyInput(props: ForwardRef<HTMLInputElement>) {
  const forwarded = forward_ref(props)
  return <input {...forwarded} />
}

events.demoEvent.listen((event) => {
  console.log('demoEvent', event.payload)
})

export function App() {
  const greetMsg = signal('')
  const name = signal('')

  async function greet() {
    const result = await commands.greet(name())
    greetMsg.set(result)
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
