import {writable} from 'svelte/store'

import { LINE_POINTS } from '../constants'

const initialState = 0

function createScore(initialValue) {
  const {subscribe, set, update} = writable(initialValue)
  return {
    subscribe,
    resetScore: () => set(0),
    addPieceScore: piecePoints => {
      update(prevScore => prevScore + piecePoints)
      
    },
    addClearedLineScore (linesCleared, currentLevel) {
      update(prevScore => {
        const linesPointIndex = linesCleared - 1
        const basePoints = LINE_POINTS[linesPointIndex]
        const increase = basePoints * (currentLevel + 1)
        return prevScore + increase
      })
    },
  }
}

export default createScore(initialState)