<script>
  import { setContext, onMount } from 'svelte'
  import pressed from 'pressed'
  import klona from 'klona'

  // helpers
  import { detectMatrixCollision, getFilledRows } from '../matrixHelpers'
  import { shuffle } from '../utils'

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
    ROTATE_LEFT_KEYS,
    ROTATE_RIGHT_KEYS,
    PLAYER_SIDEWAYS_RATE,
    PLAYER_DOWN_RATE,
  } from '../constants.js'
  import tetrominos from '../tetrominos.js'

  // stores
  import board from '../stores/board.js'
  import currentPiece from '../stores/currentPiece.js'
  import lines from '../stores/lines.js'
  import { fallRate } from '../stores/fallRate.js'
  import nextPiece from '../stores/nextPiece.js'
  import { level } from '../stores/level.js'
  import score from '../stores/score.js'
  import stats from '../stores/stats.js'

  stats.setBaseStats(tetrominos)

  // initialize context
  setContext(TETRIS, {
    currentPiece,
    board,
    nextPiece,
    level,
    lines,
    score,
    tetrominos,
    stats,
  })

  // local variables
  const canvasWidth = COLS * BLOCK_SIZE
  const canvasHeight = ROWS * BLOCK_SIZE
  const nextWidth = 4 * BLOCK_SIZE
  const nextHeight = 4 * BLOCK_SIZE

  let animationID
  let lastRightMove = 0
  let lastLeftMove = 0
  let lastDownMove = 0
  let lastRotate = 0
  // time since the piece last moved down automatically
  let timeSincePieceLastFell = 0
  let lastFrameTime = 0 // previous frame's current time
  let bag = []
  let softDropCount = 0

  function createBag() {
    // make a bag
    bag = klona(tetrominos)
    // shuffle pieces
    shuffle(bag)
  }

  function randomizeNextPiece() {
    // if there are no pieces in the bag
    if (bag.length === 0) {
      // create a new bag
      createBag()
    }
    // grab next piece
    const piece = bag.pop()
    nextPiece.setNextPiece(piece)
  }

  function makeNextPieceCurrent() {
    const spawnedPiece = centerPiece($nextPiece)
    currentPiece.setCurrentPiece(spawnedPiece)
    stats.updateStats($currentPiece.id)
  }

  /**
   * Positions a piece in the center of the board.
   * @returns a copy of the input piece
   */
  function centerPiece(piece) {
    const klonedPiece = klona(piece)
    klonedPiece.x = Math.floor((COLS - klonedPiece.matrix[0].length) / 2)
    klonedPiece.y = klonedPiece.name === 'I' ? -1 : 0
    return klonedPiece
  }

  function resetGame() {
    // reset timers
    timeSincePieceLastFell = 0
    lastFrameTime = 0

    // reset game objects
    board.resetBoard()

    // initialize pieces
    randomizeNextPiece()
    makeNextPieceCurrent()
    randomizeNextPiece()
  }

  /**
   * Affixes the current piece to the board.
   */
  function mergeCurrentPieceIntoBoard() {
    // First moves the piece up one space.
    // This allows you to shift the piece around a bit and
    // only detects collisions at the end of the step
    // instead of at the beginning.
    const previousPositionPiece = klona($currentPiece)
    previousPositionPiece.y -= 1
    board.mergePieceIntoBoard(previousPositionPiece)
    // add points equal to spaces DOWN was held
    score.addPieceScore(softDropCount)
    // reset the drop count
    softDropCount = 0
  }

  /**
   * Removes and scores completed lines in the board.
   */
  function clearCompletedLines() {
    const filledRows = getFilledRows($board)
    const numberOfClearedLines = filledRows ? filledRows.length : 0

    if (numberOfClearedLines > 0) {
      lines.setLines($lines + numberOfClearedLines)
      board.clearCompletedLines()
      // update score after any line and level updates
      score.addClearedLineScore(numberOfClearedLines, $level)
    }
  }

  function animate(currentTime) {
    let deltaTime = currentTime - lastFrameTime
    lastFrameTime = currentTime

    handlePlayerMovement(currentTime)
    handleAutomatedFalling(deltaTime)

    // check collision on each paint
    if (detectMatrixCollision($currentPiece, $board)) {
      mergeCurrentPieceIntoBoard()
      clearCompletedLines()

      makeNextPieceCurrent()
      randomizeNextPiece()

      // If there is still a collision right after a new piece is spawned, the game ends.
      if (detectMatrixCollision($currentPiece, $board)) {
        console.error('Game over!')
        return
      }
    }

    animationID = requestAnimationFrame(animate)
  }

  function handlePlayerMovement(currentTime) {
    // Calculate whether movement is allowed
    const playerSidewaysThreshold = Math.ceil(1000 / PLAYER_SIDEWAYS_RATE)
    const isLeftMovementAllowed =
      currentTime - lastLeftMove > playerSidewaysThreshold
    const isRightMovementAllowed =
      currentTime - lastRightMove > playerSidewaysThreshold
    const isDownMovementAllowed =
      currentTime - lastDownMove > Math.ceil(1000 / PLAYER_DOWN_RATE)
    const isRotateAllowed = currentTime - lastRotate > playerSidewaysThreshold

    // handle key presses
    if (pressed.some(...LEFT_KEYS)) {
      if (isLeftMovementAllowed) {
        lastLeftMove = currentTime
        currentPiece.movePieceLeft($board)
      }
    } else {
      lastLeftMove = 0
    }

    if (pressed.some(...RIGHT_KEYS)) {
      if (isRightMovementAllowed) {
        lastRightMove = currentTime
        currentPiece.movePieceRight($board)
      }
    } else {
      lastRightMove = 0
    }

    if (pressed.some(...DOWN_KEYS)) {
      if (isDownMovementAllowed) {
        lastDownMove = currentTime
        timeSincePieceLastFell = 0

        softDropCount += 1
        // increase count for each space moved
        currentPiece.movePieceDown()
      }
    } else {
      lastDownMove = 0
      softDropCount = 0
    }

    if (pressed.some(...ROTATE_LEFT_KEYS, ...ROTATE_RIGHT_KEYS)) {
      if (isRotateAllowed) {
        lastRotate = currentTime
        if (pressed.some(...ROTATE_LEFT_KEYS)) {
          currentPiece.rotateCurrentPiece($board, -1)
        }
        if (pressed.some(...ROTATE_RIGHT_KEYS)) {
          currentPiece.rotateCurrentPiece($board)
        }
      }
    } else {
      lastRotate = 0
    }
  }

  function handleAutomatedFalling(deltaTime) {
    timeSincePieceLastFell += deltaTime

    const shouldPieceFall = timeSincePieceLastFell > Math.ceil(1000 / $fallRate)

    if (shouldPieceFall) {
      timeSincePieceLastFell = 0
      currentPiece.movePieceDown()
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
    <NextPiece width={nextWidth} height={nextHeight} />
    <!-- LEVEL -->
    <Level />
  </section>
</div>

<style>
  .game {
    max-width: 56rem;
    display: grid;
    grid-template-columns: auto auto 200px;
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
