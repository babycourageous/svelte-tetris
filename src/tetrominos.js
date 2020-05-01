let id = 0

const colors = {
  t: '#6B46C1',
  j: '#F6AD55',
  z: '#E53E3E',
  o: '#F6E05E',
  s: '#68D391',
  l: '#2B6CB0',
  i: '#4FD1C5',
}

const matrixes = {
  t: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  j: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  o: [
    [1, 1],
    [1, 1],
  ],
  s: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  l: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  i: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
}

function createPiece(name, color, matrix) {
  id++

  // map non-zero values to the id of this piece
  matrix = matrix.map(row => row.map(value => (value === 0 ? 0 : id)))

  return {
    name,
    id,
    color,
    matrix,
    x: 0,
    y: 0,
    rotation: 0
  }
}

const tetrominos = [
  createPiece('I', colors.i, matrixes.i),
  createPiece('L', colors.l, matrixes.l),
  createPiece('J', colors.j, matrixes.j),
  createPiece('O', colors.o, matrixes.o),
  createPiece('T', colors.t, matrixes.t),
  createPiece('S', colors.s, matrixes.s),
  createPiece('Z', colors.z, matrixes.z),
]

export default tetrominos
