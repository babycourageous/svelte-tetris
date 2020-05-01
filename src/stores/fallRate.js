import { derived } from 'svelte/store'

import { level } from './level'
import { INITIAL_FALL_RATE, FALL_RATE_LEVEL_MODIFIER } from '../constants'

export const fallRate = derived(
  level,
  $level => INITIAL_FALL_RATE + $level * FALL_RATE_LEVEL_MODIFIER
)