import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o' | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | null
export type Row = [ Symbol, Symbol, Symbol, Symbol, Symbol]
export type Board = [ Row, Row, Row, Row, Row]

type Status = 'pending' | 'started' | 'finished'

// use this for random board generator
const emptyBoard = [...Array(7)].map(_ => Array(7).fill(null))

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {nullable: true})
  board1: Board

  @Column('json',  {nullable: true})
  board2: Board

  @Column('char', {length:1, default: 'y'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol', 'board'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column('char', {length: 1})
  symbol: Symbol

  @Column('text', {nullable: true})
  board: string

  @Column('integer', { name: 'user_id' })
  userId: number
}

