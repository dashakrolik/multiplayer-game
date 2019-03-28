import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch 
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Board } from './entities'
import {calculateWinner, playerHit, samplePlayBoard1, samplePlayBoard2} from './logic'
// import { Validate } from 'class-validator'
import {io} from '../index'

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create({
      board1: samplePlayBoard1,
      board2: samplePlayBoard2
    }).save()

    await Player.create({
      board: "board1",
      game: entity, 
      user,
      symbol: 'y'
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)


    game.status = 'started'
    await game.save()

    const player = await Player.create({
      game, 
      board: "board2",
      user,
      symbol: 'z'
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update
  ) {
    console.log('update test:', update)
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    // if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)
    // if (!isValidTransition(player.symbol, game.board, update.board)) {
    //   throw new BadRequestError(`Invalid move`)
    // }    
    let boardInPlay = game.board1
    let playerInPlay = 'y'
    if (player.symbol === 'z'){
      boardInPlay = game.board2
      playerInPlay = 'z'
    }
    const updatedBoardAfterMove = playerHit(
        boardInPlay,
        update.coordinates.toRow, 
        update.coordinates.toCell
      )

    if (playerInPlay === 'y') {
      game.board1 = updatedBoardAfterMove
    } else {
      game.board2 = updatedBoardAfterMove
    }

    const checkBoard1 = calculateWinner(game.board1);
    const checkBoard2 = calculateWinner(game.board2);
    if ((checkBoard1 === true && game[player.board] === 'board1') ||
    (checkBoard2 === true && game[player.board] === 'board2')) {
          game.winner = player.symbol 
          game.status = 'finished'
    }
    else {
      game.turn = player.symbol === 'y' ? 'z' : 'y'
    }

    await game.save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}