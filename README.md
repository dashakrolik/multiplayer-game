# Battleship Game Clone Design
Team: Darlene Decena & Daria Epaneshnikova

##Overview: 
Build a full-stack, multiplayer game using Typescript, Koa, routing-controllers and TypeORM in the backend and React/Redux in the frontend. The backend exposes a REST API, but also sends messages over websockets using SocketIO. 

The game is a clone of the popular, grid-based strategy game Battleship. 

Game design required the following: 
- The required stack in the [starter kit](https://readest.codaisseur.com/courses/advanced-bootcamp/12-games-project/01-starter)
- A playable game
- Asynchronous play
- Work in teams of 2

## About the Game:
- Objective: to destroy the opponent’s fleet of ships
- Two player game
    - Each player has two fields, each 10x10 squares
        - (1) contains a player’s fleet
        - (2) a record of shots called on opponent’s fleet
        - The columns are labeled A - J
        - The rows are labeled 1-10
    - A player’s fleet consists of 5 ships with the following size and shape:
        - Carrier:  5 squares
        - Battleship: 4 squares
        - Cruiser: 3 squares
        - Submarine: 3 squares
        - Destroyer: 2 squares
    - Each player strategically places their fleet on the player’s fleet field
        - Location of the fleet is concealed from the other player
        - Ships can only be placed horizontally or vertically
        - Ships may not touch each other
    - The number of squares a ship occupies is defined by the size of the ship
- The first turn to start the game is selected at random
- Players take turns calling “shots” at the other player’s ships
    - Calling “shots” is implemented by clicking on a square on the field
    - A player keeps track of hits and misses on a copy of the opponent’s field
    - A ship has sunk when all squares occupied the ship have been shot. 
- A player wins the game when they have sunk all of the opponent’s ships

## Game Logic:

Game Object: 
- Controls the flow of the game, gets all other resources to work 

Board Object:
- Contains an array of ships for each player
- 2D array containing entity objects: 
    - Ship Object
    - Empty Ocean

## Game Play: 
- Game object 
    - Initialized game and 2 board objects
- Board Object
    - Allocates ships for each board
- Set-up Phase
    - Place  ships and marks board
        - Button cues end of set-up phase
    - Option to have random board generator
- Game Loop
    - Players take turn choosing a square, first turn selected at random
        - Response based on the entity of the square
            - Empty => MISS
            - Ship Data Object => HIT
        - Control passes to next player
        - Loop begins again
- Winner displayed when a player loses all their ships (defined at 17 hits)





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
