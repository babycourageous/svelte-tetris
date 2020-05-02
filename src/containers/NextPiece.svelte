<script>
  import { getContext } from 'svelte'

  import { TETRIS } from '../constants'
  import Display from '../components/Display.svelte'
  import Piece from '../components/Piece.svelte'

  const { nextPiece } = getContext(TETRIS)

  export let width
  export let height

  let canvas
</script>

<Display>
  <div>
    <span>Next</span>
    <Piece {width} {height} piece={$nextPiece} />
  </div>
</Display>

<style>
  span {
    display: block;
    text-align: center;
  }
</style>
