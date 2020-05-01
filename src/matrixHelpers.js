import { inRange, times, constant, partial, lessThan } from './utils'

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

export { createEmptyMatrix, createEmptyArray }
