import { IpcEvent } from '~gen/bindings/IpcEvent'
import { IpcRequest } from '~gen/bindings/IpcRequest'
import { IpcResponse } from '~gen/bindings/IpcResponse'
import { Task } from '~utils/result'

import {
  Event as TauriEvent,
  EventTarget as TauriEventTarget,
  Options as TauriEventOptions,
  UnlistenFn,
} from '@tauri-apps/api/event'

// ---------------------------------------
// actions
// ---------------------------------------

export type IpcAction<
  REQUEST = any,
  RESPONSE = unknown,
> = (data: IpcRequest<REQUEST>) => Task<IpcResponse<RESPONSE>>

// ---------------------------------------
// events
// ---------------------------------------

type IpcEventGlobalEmitter<T> = (payload: IpcEvent<T>) => Task<void>
type IpcEventTargetEmitter<T> = (target: TauriEventTarget | string, payload: IpcEvent<T>) => Task<void>

type IpcEventListener<T> = (
  handler: (data: TauriEvent<IpcEvent<T>>) => void,
  options?: TauriEventOptions,
) => Task<UnlistenFn>

export interface IpcEventTarget<T = unknown> {
  listen: IpcEventListener<T>
  once: IpcEventListener<T>
  emit: IpcEventGlobalEmitter<T>
  emitTo: IpcEventTargetEmitter<T>
}
