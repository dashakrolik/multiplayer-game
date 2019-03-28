import React from 'react'
import './Board.css'
import hitImg from './killed_virus.png'
import missImg from './miss_splat.png'


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
    <div className="our-map" key={rowIndex} value1={rowIndex} value2={cellIndex}>
      {
        cells
          .map(
            (symbol, cellIndex) => {
              if (symbol === 'x'){
              return (
                  <button
                    className="board-tile"
                    disabled={false}
                    onClick={() => makeMove(rowIndex, cellIndex)}
                    key={`${rowIndex}-${cellIndex}`}
                  
                  ><img src={hitImg}></img>
                  
                  </button>
              )} 
              if (symbol === 'o'){
                return (
                    <button
                      className="board-tile"
                      disabled={false}
                      onClick={() => makeMove(rowIndex, cellIndex)}
                      key={`${rowIndex}-${cellIndex}`}
                    
                    ><img src={missImg}></img>
                    
                    </button>
                )}
              else {
                return (
                  <button
                  className="board-tile"
                  disabled={false}
                  onClick={() => makeMove(rowIndex, cellIndex)}
                  key={`${rowIndex}-${cellIndex}`}
                
                >{symbol && virusImage}
                
                </button>
                )
             } })
            
      }
    </div>
  )

  