import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from '@material-ui/core/Paper'
import Board from './Board'
import './GameDetails.css'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  //the coordinates are stored here we think
  makeMove = (toRow, toCell) => {
    const {game, updateGame} = this.props
    console.log(game.turn)
    if (game.turn) {
      return console.log(toRow, toCell)
    //make an action creator and a reducer for this function
    }
    
    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) 
        return game.turn //get this function to return the index here? 
        else return cell
      })
    )
    
    //use object.keys to get the indexes


    updateGame(game.id, board)
  }


    //record coordinates - how?? to pass to hitCell function
    //we need to add an event listener?
    // coordinate1 = game.board.map()
    
    // getCoordinates = (e) => {
    //   target = e.target.value
    //   return target
    // }

    // Hit the Ship function added by Dasha, still in process
    //I will provide a function that returns coordinates (taken from the key value in GameDetails)
    //after hitCell returns userClicked we will know which cell the user clicked on
    //we can then pass userClicked as props to the presentational children componenents
    //and when we do that we can render smth displaying a hit in the presentational component once that has been done

    userHit = (coordinate1, coordinate2) => {
      if (this.game.turn && this.cell !== null) {
        return false
      } 
      if (this.game.turn && this.cell === null) {
        return true
      }
    }
    

  render() {

    const {game, users, authenticated, userId} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

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
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        game.status !== 'pending' &&
        <Board board={game.board} makeMove={this.makeMove} />
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
  userHit: state.userHit
})


const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
