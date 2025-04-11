import { FeatureDefinition } from '~gen/bindings/FeatureDefinition'

import { IpcAction } from './types'

export interface Actions {
  greet: IpcAction<string, string>
  get_definitions: IpcAction<string, FeatureDefinition>
}
