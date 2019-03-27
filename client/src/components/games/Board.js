import React from 'react'
import './Board.css'

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
// console.log(rowIndex, cellIndex)
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || `Cell ${cellIndex} Row ${rowIndex}`}</button>
  )
}

//added value1 and value2 - does not break anything YET
export default ({board, makeMove}) => board.map((cells, rowIndex, cellIndex) =>
  <div key={rowIndex} value1={rowIndex} value2={cellIndex}>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)
