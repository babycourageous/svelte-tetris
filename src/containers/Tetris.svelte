<script>
  import { setContext } from 'svelte'

  // components
  import Statistics from './Statistics.svelte'
  import Lines from './Lines.svelte'
  import Board from './Board.svelte'
  import Score from './Score.svelte'
  import NextPiece from './NextPiece.svelte'
  import Level from './Level.svelte'

  // constants and data
  import { COLS, ROWS, BLOCK_SIZE, TETRIS } from '../constants.js'
  import tetrominos from '../tetrominos.js'

  // stores
  import board from '../stores/board.js'
  import currentPiece from '../stores/currentPiece.js'

  // initialize context
  currentPiece.setCurrentPiece(tetrominos[1])
  setContext(TETRIS, { currentPiece, board })

  const canvasWidth = COLS * BLOCK_SIZE
  const canvasHeight = ROWS * BLOCK_SIZE
</script>

<div class="game">

  <section class="stats">
    <Statistics />
  </section>

  <section>
    <Lines />
    <Board width={canvasWidth} height={canvasHeight} />
  </section>

  <section class="meta">
    <!-- SCORE -->
    <Score />
    <!-- NEXT PIECE -->
    <NextPiece />
    <!-- LEVEL -->
    <Level />
  </section>
</div>

<style>
  .game {
    max-width: 56rem;
    display: grid;
    grid-template-columns: 220px auto 200px;
  }
  section {
    display: flex;
    flex-direction: column;
  }
  .stats {
    align-items: flex-end;
  }
  .meta {
    align-items: flex-start;
  }
</style>
