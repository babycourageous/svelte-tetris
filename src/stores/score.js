import {writable} from 'svelte/store'

const initialState = 0

const linePoints = [40, 100, 300, 1200];

function createScore(initialValue) {
  const {subscribe, set, update} = writable(initialValue)
  return {
    subscribe,
    resetScore: () => set(0),
    updateScore: (linesCleared, currentLevel) => update(prevScore => {
      const basePoints = linePoints[linesCleared - 1]
      const increase = basePoints * (currentLevel + 1)
      return prevScore + increase
    })
  }
}

export default createScore(initialState)