/* @refresh reload */
import './styles/index.scss'

import { render } from 'solid-js/web'
import { App } from '~debug/example/App'

// import { App } from './App'

render(() => <App />, document.getElementById('root') as HTMLElement)
