<script>
  import { onMount } from 'svelte'
  import canvasHelper from '../canvasHelpers'

  export let piece
  export let width
  export let height
  export let xOffset = 0
  export let yOffset = 0

  let ref
  let ctx

  $: piece, drawCanvas(piece.matrix)

  function drawCanvas(matrix) {
    if (ctx) {
      canvasHelper.clearCanvas(ctx, '#000000')
      canvasHelper.drawMatrix(ctx, matrix, xOffset, yOffset)
    }
  }

  onMount(() => {
    ctx = ref.getContext('2d')
  })
</script>

<div>
  <canvas bind:this={ref} {width} {height}>{piece.name}</canvas>
</div>
