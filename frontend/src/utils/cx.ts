import { to_array } from './collection'
import { Any } from './types'

export type CXInput = string | undefined | null | false | {
  [K: string]: Any
}

export type CXProp<P = {}> = {
  class?: CXInput
} & P

export function cx(...inputs: CXInput[]) {
  const result = new Set<string>()

  for (const input of inputs) {
    if (!input) continue
    if (typeof input === 'string') {
      result.add(input)
      continue
    }

    for (const key in input) {
      if (!input[key]) continue
      result.add(key)
    }
  }

  return to_array(result).join(' ')
}
