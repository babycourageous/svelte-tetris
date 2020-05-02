<script>
  import { onMount } from 'svelte'
  import canvasHelper from '../canvasHelpers'

  export let piece
  export let width
  export let height

  let ref
  let ctx

  $: piece, drawCanvas(piece.matrix)

  function drawCanvas(matrix) {
    if (matrix.length > 1) {
      const x = (4 - matrix[0].length) / 2

      canvasHelper.clearCanvas(ctx, '#000000')
      canvasHelper.drawMatrix(ctx, matrix, x, 1)
    }
  }

  onMount(() => {
    ctx = ref.getContext('2d')
  })
</script>

<div>
  <canvas bind:this={ref} {width} {height}>{piece.name}</canvas>
</div>
