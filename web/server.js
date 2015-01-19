var express = require( 'express' );
var app = express();

app.use( '/liber', express.static( __dirname + '/app/' ) );

var server = app.listen( 8081 );
server.on( 'listening', function() {
	console.log( 'Listening on port ' + server.address().port );
});
