<script>
  import { setContext, onMount } from 'svelte'
  import pressed from 'pressed'

  // components
  import Statistics from './Statistics.svelte'
  import Lines from './Lines.svelte'
  import Board from './Board.svelte'
  import Score from './Score.svelte'
  import NextPiece from './NextPiece.svelte'
  import Level from './Level.svelte'

  // constants and data
  import {
    TETRIS,
    COLS,
    ROWS,
    BLOCK_SIZE,
    DOWN_KEYS,
    LEFT_KEYS,
    RIGHT_KEYS,
  } from '../constants.js'
  import tetrominos from '../tetrominos.js'

  // stores
  import board from '../stores/board.js'
  import currentPiece from '../stores/currentPiece.js'

  // initialize context
  setContext(TETRIS, { currentPiece, board })

  const canvasWidth = COLS * BLOCK_SIZE
  const canvasHeight = ROWS * BLOCK_SIZE

  let animationID

  /**
   * Returns a random piece from the tetromino matrix.
   * @returns {Object} The piece object
   */
  function getRandomPiece() {
    const l = tetrominos.length
    const i = Math.floor(Math.random() * l)
    return tetrominos[i]
  }

  function resetGame() {
    // initialize stores
    currentPiece.setCurrentPiece(getRandomPiece())
  }

  function animate(currentTime) {
    handlePlayerMovement(currentTime)
    animationID = requestAnimationFrame(animate)
  }

  function handlePlayerMovement(currentTime) {
    // handle key presses
    if (pressed.some(...LEFT_KEYS)) {
      console.log('LEFT is pressed')
    }

    if (pressed.some(...RIGHT_KEYS)) {
      console.log('RIGHT is pressed')
    }

    if (pressed.some(...DOWN_KEYS)) {
      console.log('DOWN is pressed')
    }
  }

  onMount(() => {
    // Initialize pressed utility for tracking key presses
    pressed.start(window)

    // reset values
    resetGame()

    // Start the update loop
    animationID = requestAnimationFrame(animate)
  })
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
