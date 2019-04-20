# Battle Plague! -- A Battleship Game Clone Design

## Overview: 
Build a full-stack, multiplayer game using Typescript, Koa, routing-controllers and TypeORM in the backend and React/Redux in the frontend. The backend exposes a REST API, but also sends messages over websockets using SocketIO. 

The game is a variation on the popular, grid-based strategy game Battleship. 

Game design required the following: 
- The required stack in the [starter kit](https://readest.codaisseur.com/courses/advanced-bootcamp/12-games-project/01-starter)
- A playable game
- Asynchronous play
- Work in teams of 2

## About the Game:
- Objective: to destroy all the bacteria before your opponent does
- Two player game
    - Each player has two fields
        - (1) contains a player’s field
        - (2) opponent's field to compare progress
    - Click on the field and discover/kill the bacteria 
    - Whomever kills all the bacteria first wins!

## Game Play: 
- Game object 
    - Initialized game and 2 board objects
- Board Object
    - Allocates bacterial colonies for each board
- Set-up Phase
    - Option to have random board generator
- Game Loop
    - Players take turn choosing a square, first player is the one who starts the game
        - Response based on the entity of the square
            - Empty => MISS
            - Colony Data Object => HIT
        - Control passes to next player
        - Loop begins again
- Winner displayed when a player finds/destroys all the bacterial colonies.

# Getting Started

### Postgres Database

Start a Postgres container using the following Docker command:

```bash
$ docker run \
  --rm \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres
```

### TypeStack Server

Then `cd` into the `server` directory and run `npm install` to install the dependencies.

Start the server with the `npm run dev`

### React Client

Open another terminal session and `cd` into the `client` directory, then run `npm install` to install dependencies and run `npm start` to start the dev server.
