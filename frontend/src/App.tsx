import { commands, events } from '@tauri'
import { createSignal } from 'solid-js'
import './App.css'
import Palette from './utils/palette'

function App() {
  const [greetMsg, setGreetMsg] = createSignal('')
  const [name, setName] = createSignal('')

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await commands.greet(name()))
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
          onChange={e => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg()}</p>
    </main>
  )
}

export default App
