import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Player, Row, Game } from './entities'

export const samplePlayBoard1: Board = [
  [ 'A', null, 'C', 'C','C'],
  [ 'A', null, null, null, null],
  [ 'A', null, 'B', 'B', 'B'],
  [ 'A', null, null, null, null],
  [ 'A', null, null, null, null]
]

export const samplePlayBoard2: Board = [
  [ 'C', 'C', 'C', null, 'A'],
  [ null, null, null, null, 'A'],
  [ null, null, null, null, 'A'],
  [ null, null, null, null, 'A'],
  [ 'B', 'B', 'B', null, 'A']
]

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', 'y', 'z', 'A', 'B', 'C', null ]
    return board.length === 5 &&
      board.every(row =>
        row.length === 5 &&
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
  }
}
// missed shot: 'o' successful shot: 'x'
export const playerHit = (board: Board, 
                          coordinate1: number, 
                          coordinate2: number) =>  {
    let targetCell = board[coordinate1][coordinate2];
    (targetCell === null) ? targetCell = 'o' : 
    (targetCell === 'A' || targetCell === 'B' || targetCell === 'C') 
    ? targetCell = 'x' : targetCell
    board[coordinate1][coordinate2] = targetCell
    return board
}

export const calculateWinner = (board: Board) => {
  const totalHits =  board.reduce((aggregator, array) => 
          aggregator + array.reduce((aggregator2, cell: Symbol | null) => 
            (cell === 'x') ? aggregator2 + 1 : aggregator2 + 0, 0), 0)
  return (totalHits === 11) 
}

