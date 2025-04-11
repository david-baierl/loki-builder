import { FeatureDefinition } from '~gen/bindings/FeatureDefinition'

import { IpcAction } from './types'

export interface Actions extends Record<string, IpcAction> {
  greet: IpcAction<string, string>
  get_definitions: IpcAction<string, FeatureDefinition>
}
