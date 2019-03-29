import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol } from './entities'

export const samplePlayBoard1: Board = [
  [ 'A', 'A', null, 'C','C'],
  [ 'A', 'A', null, 'C', 'C'],
  [ null, null, 'E', null, null],
  [ 'D', null, null, null, null],
  [ 'D', null, 'B', 'B', 'B']
]

export const samplePlayBoard2: Board = [
  [ 'D', 'D', null, 'A', 'A'],
  [ null, null, null, 'A', 'A'],
  [ null, null, null, null, null],
  [ 'C', 'C', null, 'E', null],
  [ 'C', 'C', null, null, null]
]

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', 'y', 'z', 'A', 'B', 'C', 'D', 'E', null ]
    return board.length === 5 &&
      board.every(row =>
        row.length === 5 &&
        row.every(symbol => symbols.includes(symbol))
      )
  }
}

// Add Random Player Board Generator HERE


// missed shot: 'o' successful shot: 'x'
export const playerHit = (board: Board, 
                          coordinate1: number, 
                          coordinate2: number) =>  {

    let targetCell = board[coordinate1][coordinate2];

    (targetCell === null) ? targetCell = 'o' : 
    (targetCell === 'A' || targetCell === 'B' || targetCell === 'C' ||
    targetCell === 'D' || targetCell === 'E') 
    ? targetCell = 'x' : targetCell

    board[coordinate1][coordinate2] = targetCell

    return board
}

export const calculateWinner = (board: Board) => {
  const totalHits =  board.reduce((aggregator, array) => 
          aggregator + array.reduce((aggregator2, cell: Symbol | null) => 
            (cell === 'x') ? aggregator2 + 1 : aggregator2 + 0, 0), 0)
  return (totalHits === 14) 
}

