import { writable } from 'svelte/store'
import klona from 'klona'

const initialState = null

function createCurrentPiece(initialPiece) {
  const { set, update, subscribe } = writable()
  return {
    subscribe,
    setCurrentPiece: piece => set(piece),
    movePieceLeft(board) {
      update(prevPiece => {
        const newPiece = klona(prevPiece)
        newPiece.x -= 1
        return newPiece
      })
    },
    movePieceRight(board) {
      update(prevPiece => {
        const newPiece = klona(prevPiece)
        newPiece.x += 1
        return newPiece
      })
    },
  }
}

export default createCurrentPiece(initialState)
