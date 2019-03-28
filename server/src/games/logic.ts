import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Player, Row, Game } from './entities'

export const samplePlayBoard1: Board = [
  [ 'A', null, null, null, 'D', 'D', 'D'],
  [ 'A', null, null, null, null, null, null],
  [ 'A', null, 'C', 'C', 'C', null, null],
  [ 'A', null, null, null, null, null, 'B'],
  [ 'A', null, null, 'E', 'E', null, 'B'],
  [ null, null, null, null, null, null, 'B' ],
  [ null, null, null, null, null, null, 'B' ],
]

export const samplePlayBoard2: Board = [
  [ null, null, 'C', 'C', 'C', null, 'A'],
  [ null, null, null, null, null, null, 'A'],
  [ null, 'D', null, 'E', 'E', null, 'A'],
  [ null, 'D', null, null, null, null, 'A'],
  [ null, 'D', null, null, null, null, 'A'],
  [ null,  null, null, null, null, null, null ],
  [ 'B', 'B', 'B', 'B', null, null, null ]
]

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', 'y', 'z', 'A', 'B', 'C', 'D', 'E', null ]
    return board.length === 7 &&
      board.every(row =>
        row.length === 7 &&
        row.every(symbol => symbols.includes(symbol))
      )
  }
}

// export const isValidTransition = (playerSymbol: Symbol, from: Board, to: Board) => {
//   const changes = from
//     .map(
//       (row, rowIndex) => row.map((symbol, columnIndex) => ({
//         from: symbol, 
//         to: to[rowIndex][columnIndex]
//       }))
//     )
//     .reduce((a,b) => a.concat(b))
//     .filter(change => change.from !== change.to)

//   return changes.length === 1 && 
//     changes[0].to === playerSymbol && 
//     changes[0].from === null
// }

const ships = {
  "Carrier": {
    shipSymbol: 'A',
    length: 5
  }, 
  "Battleship": {
    shipSymbol: 'B',
    length: 4
  }, 
  "Cruiser": {
    shipSymbol: 'C',
    length: 3
  },
  "Submarine": {
    shipSymbol: 'D',
    length: 3
  },
  "Destroyer": {
    shipSymbol: 'E',
    length: 2
  }
}

export const playerHit = (board: Board, 
  coordinate1: number, 
  coordinate2: number) =>  {
let targetCell = board[coordinate1][coordinate2];
// missed shot
(targetCell === null) ? targetCell = 'o' : 
// successful hit
(targetCell === 'A' || targetCell === 'B' || targetCell === 'C' || 
targetCell === 'D' || targetCell === 'E') ? targetCell = 'x' :
// previous target (targetCell === 'x' || targetCell === 'o') 
targetCell
board[coordinate1][coordinate2] = targetCell
return board
}

// need to connect board to a user
export const calculateWinner = (board: Board) => {
  // a winner is defined by 17 successful hits
  const totalHits =  board.reduce((aggregator, array) => 
          aggregator + array.reduce((aggregator2, cell: Symbol | null) => 
            (cell === 'x') ? aggregator2 + 1 : aggregator2 + 0, 0), 0)
  return (totalHits === 17) 
}

// export const finished = (board: Board): boolean =>
//   board
//     .reduce((a,b) => a.concat(b) as Row)
//     .every(symbol => symbol !== null)

