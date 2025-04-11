import { IpcEventTarget } from './types'

export interface Events {
  hello: IpcEventTarget<string>
}
