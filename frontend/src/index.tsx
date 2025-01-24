/* @refresh reload */
import './styles/index.scss'

import { render } from 'solid-js/web'

import { App } from './app'

render(() => <App />, document.getElementById('root') as HTMLElement)
