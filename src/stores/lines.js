import { writable } from 'svelte/store'

const initialState = 0

function createLines(initialValue) {
  const { set, update, subscribe } = writable(initialValue)

  return {
    subscribe,
    resetLines: () => set(initialValue),
    setLines: lines => set(lines),
  }
}

export default createLines(initialState)