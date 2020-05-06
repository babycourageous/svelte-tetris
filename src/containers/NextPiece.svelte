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
    <Piece
      {width}
      {height}
      piece={$nextPiece}
      xOffset={(4 - $nextPiece.matrix[0].length) / 2}
      yOffset={1} />
  </div>
</Display>

<style>
  span {
    display: block;
    text-align: center;
  }
</style>
