var express = require('express');
var chessApiRouter = require('./routers/chessApiRouter');

var app = express();
var bodyParser = require('body-parser');

app.use( bodyParser.json() );

//static 
app.use('/', express.static('./public'));
app.use('/api', chessApiRouter);

// Which port to listen on
app.set('port', process.env.PORT || 4444);

// Start listening for HTTP requests
var server = app.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
