import { writable } from 'svelte/store'

import {
  createEmptyMatrix,
  combineMatrices,
  getFilledRows,
  removeRowAndShiftDown,
} from '../matrixHelpers'
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
    clearCompletedLines() {
      update(prevBoard => {
        const filledRows = getFilledRows(prevBoard)

        return filledRows.reduce(
          (board, rowIndex) => removeRowAndShiftDown(board, rowIndex),
          prevBoard
        )
      })
    }
  }
}

export default createBoard(initialState)
