import {
  Route,
  Router,
} from '@solidjs/router'

export function AppRouter() {
  return (
    <Router>
      <Route path="/" component={() => <>@TODO</>} />
      <Route path="*404" component={() => <>not found</>} />
    </Router>
  )
}
