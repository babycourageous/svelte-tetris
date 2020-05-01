import { writable } from 'svelte/store'

import { createEmptyMatrix, combineMatrices } from '../matrixHelpers'
import { COLS, ROWS } from '../constants'

const initialState = createEmptyMatrix(COLS, ROWS)

function createBoard(initialBoard) {
  const { subscribe, set, update } = writable(initialBoard)
  return {
    subscribe,
    resetBoard() {
      set(createEmptyMatrix(COLS, ROWS))
    },
    mergePieceIntoBoard(piece) {
      update(prevBoard => {
        const { matrix: pieceMatrix, x, y } = piece
        const mergedBoard = combineMatrices(prevBoard, pieceMatrix, x, y, false)
        return mergedBoard
      })
    },
  }
}

export default createBoard(initialState)
