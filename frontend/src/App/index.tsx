import { AppProvider } from './AppProvider'
import { AppRouter } from './AppRouter'
import { WindowFrame } from './WindowFrame'

export function App() {
  return (
    <AppProvider>
      <WindowFrame>
        <AppRouter />
      </WindowFrame>
    </AppProvider>
  )
}
