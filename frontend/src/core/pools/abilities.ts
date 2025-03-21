import {
  Collectable,
  size,
} from '~utils/collection'
import { signal } from '~utils/signals'

const enum ABILITY {
  /** ability score type `strength` */
  STR,

  /** ability score type `dexterity` */
  DEX,

  /** ability score type `constitution` */
  CON,

  /** ability score type `intelligence` */
  INT,

  /** ability score type `wisdom` */
  WIS,

  /** ability score type `charisma` */
  CHA,
}

const enum ABILITY_PRIORITY {
  BASE,
  FEAT,
  ITEM,
}

// @TODO: make interface matching with content yml
export interface AbilityPoolConfig {
  abilities: Collectable<ABILITY>

  size: number

  /** how much points must be spend on one ability at once, default: 1 */
  min?: number

  /** the maximum score an ability can reach from this pool, default: infinity */
  highest?: number

  /** how much points can be spend on one ability at once, default: infinity */
  max?: number

  /** cost increase at spend points: default: { 0: 1 } */
  cost?: { [K in number]: number }
}

export class AbilityPool {
  value = signal(
    // in case the pool has only one ability, spend all of them right away
    size(this.config.abilities) === 1 ? this.config.size : 0,
  )

  constructor(public config: AbilityPoolConfig) {}
}

export interface AbilityScore {
  min: number
  max: number
  value: number
}

export type AbilityPools = {
  [K in ABILITY_PRIORITY]?: AbilityPoolConfig[]
}

// ---------------------------------------
// sort
// ---------------------------------------

// priority
// cost
// highest

// --- example ---  //

// 0 base         (cost 1)
// 0 point buy    (cost 1) highest 13 (absolute)
// 0 background   (cost 1) max 2  (relative)
// 0 point buy    (cost 2) highest 15 (absolute)

// 1 feat         (cost 1) highest 20 (absolute)
// 1 feat         (cost 1) highest 20 (absolute)
// 1 feat         (cost 1) highest 20 (absolute)
// 1 feat         (cost 1) highest 30 (absolute)

// 2 items        (cost 1) highest 22 (absolute)

// ---------------------------------------
// minimum
// ---------------------------------------

// base 8
// feat 1

// ---------------------------------------
// maximum
// ---------------------------------------

// base           8 (-8) = 8
// point buy (1)  5 (-5) = 13
// background     2 (-2) = 15
// point buy (2)  2 (-4) = 17

// feat           1 (-1) = 18

// item (max 16)  1 (-1) = 18 (max reached)

// ___________________________
//                         18

// in case of the maximum of the item
// we need to use an addition pipeline instead of flat addition
