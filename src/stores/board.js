import { writable } from 'svelte/store'

import { createEmptyMatrix } from '../matrixHelpers'
import { COLS, ROWS } from '../constants'

const initialState = createEmptyMatrix(COLS, ROWS)

function createBoard(initialBoard) {
  const { subscribe, set, update } = writable(initialBoard)
  return {
    subscribe,
    resetBoard() {
      set(createEmptyMatrix(COLS, ROWS))
    },
  }
}

export default createBoard(initialState)
