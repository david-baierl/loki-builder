import './App.css'

import Palette from '@debug/palette'
import {
  commands,
  events,
} from '@tauri'
import { signal } from '@utils/signals'

function App() {
  const greetMsg = signal('')
  const name = signal('')

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    greetMsg.set(await commands.greet(name()))
    await events.demoEvent.emit('hello event')
  }

  return (
    <main class="container">
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

export default App
