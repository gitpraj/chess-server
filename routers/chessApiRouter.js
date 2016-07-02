var express = require('express');
var chessApiRouter = express.Router();

var Chess = require('../../chess.js/chess').Chess;
var chess = new Chess();

chessApiRouter.get('/', function(req, res){
  res.send("Hello world");
});

// get the current board state
chessApiRouter.get('/board', goToPosition , returnBoard);

// get history
chessApiRouter.get('/board/history', function(req, res){
  return res.send( chess.history() ); 
});

// post a move to make changes to the board
chessApiRouter.post('/board', makeMove, returnBoard);

// ---------------------------------------------------------------
function goToPosition(req, res, next){
  console.log("Go to move : " + req.query.goback);

  var history = chess.history();

  var goback = 0;
  if( req.query.goback > history.length || req.query.goback < 0){
    return res.status(400).send("Invalid value for goback parameter");
  }

  if( req.query.goback != null ){
    goback = req.query.goback
  }

  var newChess = new Chess();

  for( var i = 0 ; i < history.length - goback ; ++i ){
    newChess.move(history[i]);
  };

  req.chess = newChess;
  return next();
}

function makeMove(req, res, next){
  console.log("Received move : " +  JSON.stringify(req.body) );
  var status = chess.move( req.body.move );

  if(status == null){
    return res.status(400).send("Invalid move");
  }

  req.chess = chess;
  return next();
}

function returnBoard(req, res){
  if( req.query.format == "ascii" ){
    res.send(req.chess.ascii());
  }
  else if( req.query.format == "pgn" ){
    res.send(req.chess.pgn());
  }
  else{
    res.send(req.chess.fen());
  }
}

module.exports = chessApiRouter;
