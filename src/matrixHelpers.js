import klona from 'klona'

import { inRange, times, constant, partial, lessThan } from './utils'
import { COLS, ROWS } from './constants'

const getMatrixHeight = matrix => matrix.length
const getMatrixWidth = matrix => matrix[0].length

/**
 * Create a matrix of "0"s given the number of columns and rows
 *
 * @param {Number} cols Number of columns
 * @param {Number} rows Number of rows
 * @returns {Array} Empty 2 dimensional array
 */
function createEmptyMatrix(cols, rows) {
  // create a single column
  const column = createEmptyArray(rows)
  // callback function to create the row
  const createRow = partial(createEmptyArray, cols)
  // for each column create a row and return matrix
  return column.map(createRow)
}

/**
 * Creates an array with length "length" filled with "0"s
 *
 * @param {Number} length The length of the returned empty array
 * @returns {Array} An empty array
 */
const createEmptyArray = length => times(length, constant(0))

/**
 * Detects collision between a piece and board
 * by checking if the piece is within the bounds of the board
 *
 * @param {Object} piece The full piece object
 * @param {Array} board The board matrix
 * @returns {Boolean} True if there is a collision, false if not
 */
function detectMatrixCollision(piece, board, xOffset = 0, yOffset = 0) {
  const temp = klona(piece)
  temp.x += xOffset
  temp.y += yOffset

  if (inBounds(temp, board)) {
    return false
  }
  return true
}

/**
 * Checks if a piece is within the bounds of the board
 *
 * @param {Object} piece The full piece object
 * @param {Array} board The board matrix
 * @returns {Boolean} True if the piece is within bounds of board, false if not
 */
function inBounds(piece, board) {
  const { matrix } = piece
  return matrix.every((row, dy) => {
    return row.every((value, dx) => {
      let x = piece.x + dx
      let y = piece.y + dy
      return value === 0 || (insideWalls(x) && aboveFloor(y) && notOccupied(x, y, board))
    })
  })
}

/**
 * Checks if a cell is located within the walls of the board
 *
 * @param {Number} x The location of the cell
 * @returns {Boolean} True if the cell is within the walls, false if not
 */
function insideWalls(x) {
  return x >= 0 && x < COLS
}

/**
 * Checks if a cell is located above the floor of the board
 *
 * @param {Number} y The row location of the cell
 * @returns {Boolean} True if the cell is above the floor, false if not
 */
function aboveFloor(y) {
  return y <= ROWS
}

/**
 * Checks if the space on the board is occupied by a piece represented by a non-zero number
 *
 * @param {Number} x The column location
 * @param {Number} y The row location
 * @param {Array} board The 2 dimensional board array
 * @returns {Boolean} True if there is nothing (0) in that spot, false if it is occupied
 */
function notOccupied(x, y, board) {
  return y < 0 || board[y] && board[y][x] === 0
}

/**
 * Combines two matrixes (a board and a piece) and returns the new matrix
 *
 * @param {Array} destinationMatrix The board matrix
 * @param {Array} sourceMatrix The piece matrix
 * @param {number} [offsetX=0] The x location of the piece
 * @param {number} [offsetY=0] The y location of the piece
 * @param {boolean} [overwrite=true] Whether to overwrite the board matrix
 * @returns {Array} The new board matrix with merged piece
 */
function combineMatrices(
  destinationMatrix,
  sourceMatrix,
  offsetX = 0,
  offsetY = 0,
  overwrite = true
) {
  const lastXIndex = getMatrixWidth(sourceMatrix) + offsetX - 1
  const lastYIndex = getMatrixHeight(sourceMatrix) + offsetY - 1

  const newMatrix = destinationMatrix.map((rows, y) => {
    return rows.map((value, x) => {
      if (inRange(x, offsetX, lastXIndex + 1) && inRange(y, offsetY, lastYIndex + 1)) {
        if (overwrite || !value) {
          return sourceMatrix[y - offsetY][x - offsetX]
        }
      }
      return value
    })
  })

  return newMatrix
}

function getFilledRows(matrix) {
  return matrix.reduce((filledRows, row, rowIndex) => {
    // check that every element in the row is a filled block
    if (row.every(i => lessThan(0, i))) {
      filledRows.push(rowIndex)
    }
    return filledRows
  }, [])
}

function removeRow(matrix, rowIndex) {
  const klone = klona(matrix)
  klone.splice(rowIndex, 1)
  return klone
}

function removeRowAndShiftDown(matrix, rowIndex) {
  const w = getMatrixWidth(matrix)
  const emptyRowMatrix = [createEmptyArray(w)]
  const newBoard = emptyRowMatrix.concat(removeRow(matrix, rowIndex))
  return newBoard
}

function flip(matrix) {
  const h = matrix.length
  const w = matrix[0].length

  let newMatrix = createEmptyMatrix(h, w)

  times(h, row => {
    times(w, column => {
      newMatrix[column][row] = matrix[row][column]
    })
  })
  return newMatrix
}

const mirror = matrix => matrix.map(row => row.reverse())

const rotateRight = matrix => {
  return mirror(flip(matrix))
}

const rotateLeft = matrix => {
  return flip(matrix).reverse()
}

function rotate(matrix, direction) {
  if (direction && direction <= 0) {
    return rotateLeft(matrix)
  }
  return rotateRight(matrix)
}

export {
  getMatrixHeight,
  getMatrixWidth,
  createEmptyMatrix,
  createEmptyArray,
  detectMatrixCollision,
  combineMatrices,
  rotate,
  getFilledRows,
  removeRow,
  removeRowAndShiftDown,
}