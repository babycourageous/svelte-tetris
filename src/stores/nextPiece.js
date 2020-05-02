import { writable } from 'svelte/store'

const initialState = {
  name: '',
  matrix: [[0]],
  id: -1,
  color: 0,
}

function createNextPiece(piece = {}) {
  const { subscribe, set } = writable(piece)

  return {
    subscribe,
    setNextPiece: nextPiece => set(nextPiece),
  }
}

export default createNextPiece(initialState)
