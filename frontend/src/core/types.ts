type KeyRef = string
type WildcastRef = `${string}/*`

// -----------------------------------------------------------
// resource
// -----------------------------------------------------------

const enum RESOURCE_REFRESH {
  ATTACK,
  ACTION,
  TURN,
  ROUND,
  FIGHT,
  SHORT_REST,
  LONG_REST,
  MANUAL,
  NEVER,
}

interface Resource {
  resource: KeyRef | WildcastRef

  /** calculated when feature refreshes @default 1 */
  value: number | string

  /** @default LONG_REST */
  refresh?: RESOURCE_REFRESH
}

// -----------------------------------------------------------
// score
// -----------------------------------------------------------

interface Score {
  score: KeyRef

  /** calculated when gaining this feature @default 1 */
  value?: number | string

  /** live updated when dependencies changes */
  compute?: string
}

interface ScorePool {
  score: WildcastRef | KeyRef[]

  /** calculated when gaining this feature @default 1 */
  value?: number | string

  /** the maximum score an ability can reach from this pool, @default infinity */
  max?: number

  /** how much points can be spend on one ability at once, @default infinity */
  limit?: number

  // @TODO: add math possibility
  /** cost increase at score: @default {0:1} */
  cost?: { [K in number]: number }
}

interface ScoreSpend {
  spend: KeyRef

  /** @default 1 */
  value?: number
}

// -----------------------------------------------------------
// options
// -----------------------------------------------------------

interface Options {
  options: WildcastRef | KeyRef[]
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
  | ScorePool
  | ScoreSpend
  | Resource

  // inline anonymous definition
  | Definition

interface Definition {
  name?: string

  /** markdown */
  description?: string

  /** require features, conditions or positive values (computed) */
  require: string | string[]

  add?: Feature | Feature[]
  remove?: KeyRef | WildcastRef
}

export interface Content {
  [K: KeyRef]: Definition
}
