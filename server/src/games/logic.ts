import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Row } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', 'A', 'B', 'C', 'D', 'E', null ]
    return board.length === 10 &&
      board.every(row =>
        row.length === 10 &&
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

export const ships = {
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
// previous target
// (targetCell === 'x' || targetCell === 'o') 
console.log("Shot already fired at these coordinates") 
}

export const calculateWinner = (board: Board) => {
  // to calculate winner we would map through each player's board and
  // count how many successful hits are on a board
  // a winner is defined by having 17 hits
  const totalHits =  board.reduce((agg, arr) => 
          agg + arr.reduce((agg2, cell: Symbol | null) => 
            (cell === 'x') ? agg2 + 1 : agg2 + 0, 0), 0)
  return totalHits === 17
}

// export const finished = (board: Board): boolean =>
//   board
//     .reduce((a,b) => a.concat(b) as Row)
//     .every(symbol => symbol !== null)
