// GENERAL
// key for Svelte context
export const TETRIS = {}

// Levels
export const START_LEVEL = 0
export const NEW_LEVEL_EVERY = 10

// Key mappings
export const DOWN_KEYS = ['down']
export const LEFT_KEYS = ['left']
export const RIGHT_KEYS = ['right']
export const ROTATE_LEFT_KEYS = ['ctl', 'z']
export const ROTATE_RIGHT_KEYS = ['up', 'x']

// When holding down a key, a player will move this many times per second....
export const PLAYER_SIDEWAYS_RATE = 6
export const PLAYER_DOWN_RATE = 20

// Falling rate should be expressed in steps per second.
export const INITIAL_FALL_RATE = 1

// This number is added to the fall rate on each new level
export const FALL_RATE_LEVEL_MODIFIER = 0.5

// BOARD
export const COLS = 10 //width
export const ROWS = 20 // height
export const BG_COLOR = '#000000'

// PIECE
export const BLOCK_SIZE = 20
