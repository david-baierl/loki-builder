type KeyRef = string
type WildcastRef = `${string}/*`

type Command =
  // @TODO
  | `/roll ${string}`

interface BaseDef {
  name?: string

  /** markdown */
  description?: string
}

// -----------------------------------------------------------
// score
// -----------------------------------------------------------

interface Score {
  score: KeyRef | WildcastRef

  /** @default 1 */
  value?: number | Command

  /** the maximum score an ability can reach from this pool, @default infinity */
  max?: number

  /** how much points can be spend on one ability at once, @default infinity */
  limit?: number

  // @TODO: add math possibility
  /** cost increase at score: @default {0:1} */
  cost?: { [K in number]: number }
}

// -----------------------------------------------------------
// options
// -----------------------------------------------------------

interface Options {
  options: WildcastRef | Feature[]
  default?: KeyRef
}

// -----------------------------------------------------------
// feature
// -----------------------------------------------------------

type Feature =
  // reference feature
  | KeyRef
  | WildcastRef
  | Options

  // modify values
  | Score

  // inline anonymous definition
  | Definition

interface FeatureDef extends BaseDef {
  add?: Feature | Feature[]
  remove?: KeyRef | WildcastRef
}

type Definition =
  | FeatureDef

export interface Content {
  [K: KeyRef]: Definition
}
