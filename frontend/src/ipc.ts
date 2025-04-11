import { FeatureDefinition } from '~gen/bindings/FeatureDefinition'
import { IpcRequest } from '~gen/bindings/IpcRequest'
import { IpcResponse } from '~gen/bindings/IpcResponse'
import { assert } from '~utils/assert'
import {
  Task,
  try_async,
} from '~utils/result'

import { invoke } from '@tauri-apps/api/core'

// ---------------------------------------
// types
// ---------------------------------------

type IpcCall<
  REQUEST = any,
  RESPONSE = unknown,
> = (data: REQUEST) => Task<IpcResponse<RESPONSE>>

// --- methods --- //

export interface IPC extends Record<string, IpcCall> {
  greet: IpcCall<string, string>
  get_definitions: IpcCall<string, FeatureDefinition>
}

// ---------------------------------------
// implementation
// ---------------------------------------

export const IPC = new Proxy({} as IPC, {
  get(_, key): IpcCall {
    assert(typeof key === 'string')
    return data => try_async(() => invoke(
      key,
      { data } satisfies IpcRequest<any>,
    ))
  },
})
