import { writable } from 'svelte/store'

const initialState = null

function createCurrentPiece(initialPiece) {
  const { set, update, subscribe } = writable()
  return {
    subscribe,
    setCurrentPiece: piece => set(piece),
  }
}

export default createCurrentPiece(initialState)
