import { BLOCK_SIZE, BG_COLOR } from './constants'
import tetrominos from './tetrominos'

/**
 * Gets a piece color from an object for the piece with the provided id.
 *
 * @param {Number} id The id of the object to find
 * @returns {String} The HEX color of the piece
 */
const getColorForID = id => tetrominos.find(o => o.id === id).color

/**
 * Draw a single block to the canvas at the row and column provided
 *
 * @param {CanvasRenderingContext2D} context the canvas
 * @param {Number} row the row to draw to
 * @param {Number} col the column to draw to
 * @param {String} color the HEX color of the block
 */
function drawBlock(context, row, col, color) {
  // scale the coordinates up
  const x = row * BLOCK_SIZE
  const y = col * BLOCK_SIZE
  const w = BLOCK_SIZE
  const h = BLOCK_SIZE

  context.fillStyle = color
  context.fillRect(x, y, w, h)

  drawHighlight(context, x, y, w, h)
}

/**
 * Draws a highlight to a block within the given context
 *
 * @param {CanvasRenderingContext2D} context The context to draw to.
 * @param {Number} x The x coordinate for the fill
 * @param {Number} y The y coordinate for the fill
 * @param {Number} w  The width of the block
 * @param {Number} h The height of the block
 */
function drawHighlight(context, x, y, w, h) {
  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x + w, y)
  context.lineTo(x + w - 2, y + h - 18)
  context.lineTo(x + w - 18, y + 2)
  context.closePath()
  context.fillStyle = `rgba(255, 255, 255, .2)`
  context.fill()

  context.beginPath()
  context.moveTo(x + w, y)
  context.lineTo(x + w, y + h)
  context.lineTo(x + w - 2, y + h - 2)
  context.lineTo(x + w - 2, y + 2)
  context.closePath()
  context.fillStyle = `rgba(255,255,255, .2)`
  context.fill()

  context.beginPath()
  context.moveTo(x + w, y + h)
  context.lineTo(x, y + h)
  context.lineTo(x + 2, y + h - 2)
  context.lineTo(x + w - 2, y + h - 2)
  context.closePath()
  context.fillStyle = `rgba(0,0,0, .4)`
  context.fill()

  context.beginPath()
  context.moveTo(x, y + h)
  context.lineTo(x, y)
  context.lineTo(x + 2, y + 2)
  context.lineTo(x + 2, y + h - 2)
  context.closePath()
  context.fillStyle = `rgba(0,0,0, .2)`
  context.fill()
}

/**
 * Draws a rectangle representing a board
 *
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {Array} boardMatrix The 2D array to use as our coordinates
 */
function drawBoard(context, boardMatrix) {
  drawMatrix(context, boardMatrix, 0, 0)
}

/**
 * Draw a single tetromino to an HTML canvas
 *
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {Object} piece The piece object to use
 */
function drawPiece(context, piece) {
  drawMatrix(context, piece.matrix, piece.x, piece.y)
}

/**
 * Clears then draws a board and current piece to the canvas
 *
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {Array} board The 2D array to use as our coordinates
 * @param {Object} currentPiece The piece object to use
 */
function drawGame(context, board, currentPiece) {
  clearCanvas(context, BG_COLOR)
  // if (config.showGuideLines && !isMidnightMode()) {
  // drawGuideLines(context)
  // }
  drawBoard(context, board)
  drawPiece(context, currentPiece)
}

/**
 * Renders the provided matrix to a canvas
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {Array} matrix The 2D array to use as our coordinates
 * @param {Number} xOffset
 * @param {Number} yOffset
 */
function drawMatrix(context, matrix, xOffset = 0, yOffset = 0) {
  matrix.map((col, colIndex) => {
    col.map((row, rowIndex) => {
      if (row !== 0) {
        drawBlock(context, rowIndex + xOffset, colIndex + yOffset, getColorForID(row))
      }
    })
  })
}

/**
 * Reset the canvas
 *
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {String} color The color to fill the resulting rectangle with
 */
function clearCanvas(context, color) {
  context.fillStyle = color
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

export default {
  drawGame,
  drawMatrix,
  clearCanvas,
}
