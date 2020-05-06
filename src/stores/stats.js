import {writable} from 'svelte/store'

const initialState = []

function createStats () {
  const {subscribe, set, update} = writable(initialState)

  return {
    subscribe,
    setBaseStats(pieces) {
      let stats = []
      stats = pieces.map(piece => {
        return {
          id: piece.id,
          count: 0,
        }
      }
      );
      set(stats)
    },
    updateStats(id) {
      update(prevStats => {
        const index = prevStats.findIndex(item => item.id === id)
        prevStats[index].count++
        return prevStats
      })
    }
  }
}

export default createStats()