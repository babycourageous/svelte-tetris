import { writable } from 'svelte/store'
import klona from 'klona'

import { detectMatrixCollision } from '../matrixHelpers'

const initialState = null

function moveAndCheck(piece, board, direction) {
  const newPiece = klona(piece)
  newPiece.x += direction
  if (detectMatrixCollision(newPiece, board)) {
    return piece
  }
  return newPiece
}

function createCurrentPiece(initialPiece) {
  const { set, update, subscribe } = writable()
  return {
    subscribe,
    setCurrentPiece: piece => set(piece),
    movePieceLeft(board) {
      update(prevPiece => moveAndCheck(prevPiece, board, -1))
    },
    movePieceRight(board) {
      update(prevPiece => moveAndCheck(prevPiece, board, 1))
    },

    movePieceDown(board) {
      update(prevPiece => {
        const newPiece = klona(prevPiece)
        newPiece.y += 1
        return newPiece
      })
    },

  }
}

export default createCurrentPiece(initialState)
