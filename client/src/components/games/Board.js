import React from 'react'
import './Board.css'
import hitImg from '../../assets/dead-particle.png'
import missImg from '../../assets/red-cross.png'


const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn, virusImage) => {
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
                  
                  ><img src={hitImg} alt="x'ed viral particle"></img>
                  
                  </button>
              )} 
              if (symbol === 'o'){
                return (
                    <button
                      className="board-tile"
                      disabled={false}
                      onClick={() => makeMove(rowIndex, cellIndex)}
                      key={`${rowIndex}-${cellIndex}`}
                    
                    ><img src={missImg} alt="inkplat"></img>
                    
                    </button>
                )}
              else {
                return (
                  <button
                  className="board-tile"
                  disabled={false}
                  onClick={() => makeMove(rowIndex, cellIndex)}
                  key={`${rowIndex}-${cellIndex}`}
                
                >{symbol}
                
                </button>
                )
             } })
            
      }
    </div>
  )

  