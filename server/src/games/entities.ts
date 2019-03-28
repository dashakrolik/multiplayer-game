import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o' | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E'
// figure out how to streamline the typescript definition
export type Row = [ Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null ]
export type Board = [ Row, Row, Row, Row, Row, Row, Row, Row, Row, Row ]

const emptyBoard = [...Array(10)].map(x => Array(10).fill(null))

const samplePlayBoard1 = [
  [ 'A', null, null, null, null, null, 'D', 'D', 'D', null ],
  [ 'A', null, null, null, null, null, null, null, null, null ],
  [ 'A', null, null, null, null, null, null, null, null, null ],
  [ 'A', null, null, null, null, null, null, null, null, null ],
  [ 'A', null, null, 'E', 'E', null, null, null, null, null ],
  [ null, null, null, null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null, null, null, 'B' ],
  [ null, null, null, null, null, null, null, null, null, 'B' ],
  [ null, null, null, null, null, null, null, null, null, 'B' ],
  [ null, null, null, 'C', 'C', 'C', null, null, null, 'B' ]
]

type Status = 'pending' | 'started' | 'finished'

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: samplePlayBoard})
  board1: Board

  @Column('char', {length:1, default: 'y'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column('char', {length: 1})
  symbol: Symbol

  @Column('integer', { name: 'user_id' })
  userId: number
}
