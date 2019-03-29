import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from '@material-ui/core/Paper'
import Board from './Board'
import ReadOnlyBoard from './ReadOnlyBoard'
import './GameDetails.css'
import splatSound from '../../assets/splat.wav'

class GameDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.onPlay=this.onPlay.bind(this)
    this.sound = new Audio(splatSound)
  }

  onPlay(){
    this.sound.play()
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
      
    }
  }

  

  virusImage = <img src="http://i67.tinypic.com/j5knr7.png" alt="viral particle"></img>
  joinGame = () => this.props.joinGame(this.props.game.id)


  makeMove = (toRow, toCell) => {
    this.onPlay()
    const {game, updateGame} = this.props

    console.log('game test:', game)


    const coordinates1 = {toRow, toCell}
    

    console.log("game.turn test:", game.turn)

    console.log("coordinates1 test:", coordinates1)
    
    // const board = game.board.map(
    //   (row, rowIndex) => row.map((cell, cellIndex) => {
    //     if (rowIndex === toRow && cellIndex === toCell) 
    //     return game.turn //get this function to return the index here? 
    //     else return cell
    //   })
    // )

    console.log('makeMove after test!')

    updateGame(game.id, game.board1, game.board2, coordinates1)

  }

  render() {
    console.log("game details this.props test:", this.props)

    console.log('i am render of gamedetails')

    const {game, users, authenticated, userId} = this.props
    console.log("GAME:", game)

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)
    // const myBoardName = player.board
    // console.log("BOARD", myBoardName)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]


    return (<Paper className="outer-paper">
      
      <h3>Game Play: {game.status}</h3>
      <p>Game #{game.id}</p>
      

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      }

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <h1>Winner: {users[winner].firstName}</h1>
      }

      <hr />
      
      {
        game.status !== 'pending' && player.board === 'board1' &&
        <div>
            <Board board={game.board1} makeMove={this.makeMove} virusImage={this.virusImage}/>
            <hr />
            <ReadOnlyBoard board={game.board2} makeMove={this.makeMove} virusImage={this.virusImage} />
        </div>
      }
  
      {
        game.status !== 'pending' && player.board === 'board2' &&
        <div>
            <Board board={game.board2} makeMove={this.makeMove} virusImage={this.virusImage}/>
            <hr />
            <ReadOnlyBoard board={game.board1} makeMove={this.makeMove} virusImage={this.virusImage} />
        </div>
      }
  
    </Paper>)
    
  } 

}

//added userClicked state to props
const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users,
  userHit: state.userHit,
  coordinates: state.coordinates
})


const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
