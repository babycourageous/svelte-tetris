<script>
  import { onMount, getContext } from 'svelte'

  import { TETRIS } from '../constants'
  import canvasHelper from '../canvasHelpers.js'
  import Display from '../components/Display.svelte'

  export let width
  export let height

  let canvas
  let ctx

  const { currentPiece, board } = getContext(TETRIS)

  $: $currentPiece && drawCanvas()

  function drawCanvas() {
    canvasHelper.drawGame(ctx, $board, $currentPiece)
  }

  onMount(() => {
    ctx = canvas.getContext('2d')
  })
</script>

<Display>
  <canvas bind:this={canvas} {width} {height} />
</Display>
