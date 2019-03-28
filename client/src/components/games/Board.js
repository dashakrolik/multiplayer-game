import React from 'react'
import './Board.css'


const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn, virusImage) => {
// console.log(rowIndex, cellIndex)



  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    
    >{symbol && virusImage}
    
    </button>
  )
}

//added value1 and value2 - does not break anything YET
export default ({board, makeMove, virusImage}) => board
  .map((cells, rowIndex, cellIndex) =>
    <div key={rowIndex} value1={rowIndex} value2={cellIndex}>
      {
        cells
          .map(
            (symbol, cellIndex) =>
              renderCel(makeMove, rowIndex, cellIndex,symbol,false, virusImage)
          )
      }
    </div>
  )


