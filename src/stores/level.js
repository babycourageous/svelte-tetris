import { derived } from 'svelte/store'

import lines from './lines'
import { START_LEVEL, NEW_LEVEL_EVERY } from '../constants'

export const level = derived(lines, $lines =>
  Math.max(START_LEVEL, Math.floor($lines / NEW_LEVEL_EVERY))
)
