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
    PLAYER_SIDEWAYS_RATE,
    PLAYER_DOWN_RATE,
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
  let lastRightMove = 0
  let lastLeftMove = 0

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
    // Calculate whether movement is allowed
    const playerSidewaysThreshold = Math.ceil(1000 / PLAYER_SIDEWAYS_RATE)
    const isLeftMovementAllowed =
      currentTime - lastLeftMove > playerSidewaysThreshold
    const isRightMovementAllowed =
      currentTime - lastRightMove > playerSidewaysThreshold

    // handle key presses
    if (pressed.some(...LEFT_KEYS)) {
      if (isLeftMovementAllowed) {
        lastLeftMove = currentTime
        console.log('LEFT pressed')
      }
    } else {
      lastLeftMove = 0
    }

    if (pressed.some(...RIGHT_KEYS)) {
      if (isRightMovementAllowed) {
        lastRightMove = currentTime
        console.log('RIGHT pressed')
      }
    } else {
      lastRightMove = 0
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
