import { assert } from '~utils/assert'
import { try_async } from '~utils/result'

import { invoke } from '@tauri-apps/api/core'
import {
  emit,
  emitTo,
  listen,
  once,
} from '@tauri-apps/api/event'

import {
  IpcAction,
  IpcEventTarget,
} from './types'

import type { Actions } from './actions'
import type { Events } from './events'

export namespace IPC {

  // --- actions --- //

  export const Actions = new Proxy({} as Actions, {
    get(_, name): IpcAction {
      assert(typeof name === 'string')
      return request => try_async(() => invoke(name, { request }))
    },
  })

  // --- events --- //

  export const Events = new Proxy({} as Events, {
    get(_, event_name): IpcEventTarget {
      assert(typeof event_name === 'string')

      return {
        listen: (fn, options) => try_async(() => (
          listen(event_name, fn, options)
        )),
        once: (fn, options) => try_async(() => (
          once(event_name, fn, options)
        )),
        emit: payload => try_async(() => (
          emit(event_name, payload)
        )),
        emitTo: (target, payload) => try_async(() => (
          emitTo(target, event_name, payload)
        )),
      }
    },
  })
}
