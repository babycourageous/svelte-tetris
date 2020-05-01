import { writable } from 'svelte/store'
import klona from 'klona'

import { detectMatrixCollision, rotate } from '../matrixHelpers'
import { kicks } from '../wallKicks'

const initialState = null

function moveAndCheck(piece, board, direction) {
  const newPiece = klona(piece)
  newPiece.x += direction
  if (detectMatrixCollision(newPiece, board)) {
    return piece
  }
  return newPiece
}

function createCurrentPiece(initialPiece) {
  const { set, update, subscribe } = writable()
  return {
    subscribe,
    setCurrentPiece: piece => set(piece),
    movePieceLeft(board) {
      update(prevPiece => moveAndCheck(prevPiece, board, -1))
    },
    movePieceRight(board) {
      update(prevPiece => moveAndCheck(prevPiece, board, 1))
    },

    movePieceDown(board) {
      update(prevPiece => {
        const newPiece = klona(prevPiece)
        newPiece.y += 1
        return newPiece
      })
    },
    rotateCurrentPiece(board, direction = 1) {
      update(prevPiece => {
        // 0. if this is the "O" piece we can just return it
        if (prevPiece.name === 'O') {
          return prevPiece
        }

        // 1. clone the current piece in case we have to return original
        let newPiece = klona(prevPiece)

        // 2. store a reference to the starting rotation position (0-3)
        // and advance rotation position
        const rotation = newPiece.rotation
        newPiece.rotation = (prevPiece.rotation + 1) % 4

        // 3. rotate the cloned piece's matrix
        newPiece.matrix = rotate(newPiece.matrix, direction)

        // 4. If the rotation results in a collision
        if (detectMatrixCollision(newPiece, board)) {
          // 4a. Find the tests for this piece from the pre-defined object of kicks
          const pieceKicks = kicks[Object.keys(kicks).filter(kick => kick.includes(newPiece.name))]
          // 4b. Grab the tests for the current start rotation and direction
          const tests = pieceKicks.filter(
            k => k.rotation === rotation && k.direction === direction
          )[0].tests
          // 4c. Store reference to current state
          let validRotation = false
          // 4d. Run thru the tests - return the new piece adjusted for kick when first non-collision position found
          for (let test of tests) {
            // 5. If test results in collision-free placement
            if (!detectMatrixCollision(newPiece, board, test.dx, test.dy)) {
              validRotation = true

              newPiece.x += test.dx
              newPiece.y += test.dy

              break
            }
          }

          // 6. After checking our tests return new or previous piece
          if (validRotation) {
            return newPiece
          } else {
            return prevPiece
          }
          // 7. Original rotation didn't result in collicion
        } else {
          return newPiece
        }
      })
    },  
  }
}

export default createCurrentPiece(initialState)
