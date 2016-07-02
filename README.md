# chess-server

## To start server

```
npm install
node index.js
```

## API

### GET /api/board

Gets the current state of the board.  
Supported parameters:  
  * format - format of the board state. Can give "pgn" , "fen" , "ascii". ( default : "fen" )   
  * goback - gives the state of the board a few steps back. goback = 1 means, one step back.
  
Sample request and response:
```
> curl localhost:4444/api/board?format=ascii

   +------------------------+
 8 | r  n  b  q  k  b  n  r |
 7 | p  p  p  p  p  p  p  p |
 6 | .  .  .  .  .  .  .  . |
 5 | .  .  .  .  .  .  .  . |
 4 | .  .  .  .  .  .  .  . |
 3 | .  .  .  .  .  .  .  . |
 2 | P  P  P  P  P  P  P  P |
 1 | R  N  B  Q  K  B  N  R |
   +------------------------+
     a  b  c  d  e  f  g  h

```

### POST /api/board   
{
  "move" : "Nf3"
}

Makes the given move on the board. If successfull , returns 200 OK.
If the move is invalid, you'll get a 400 Invalid move error.

Sample request and response:
```
> curl -H 'content-type: application/json' localhost:4444/api/board -d '{ "move" : "e4" }'

rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
```

### POST /api/board/reset   

Resets the board to start of game. If successfull , returns 200 OK.

Sample request and response:
```
> curl -XPOST localhost:4444/api/board/reset

rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```

## Front End
The front-end shows the board in the current state using the APIs listed above. You can go back and forth to replay the game.
There is a reset button to come back to current position. 
In current position, the moves will be automatically updated upon changes to the board from other client API requests.

To view the board, point your browser to -> localhost:4444
