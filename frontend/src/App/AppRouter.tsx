import {
  Route,
  Router,
} from '@solidjs/router'

import { Home } from './pages'

export function AppRouter() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="*404" component={() => <>@TODO: not found</>} />
    </Router>
  )
}
