var express = require( 'express' );
var app = express();

app.use( '/liber', express.static( __dirname + '/dist/' ) );

var server = app.listen( 8082 );
server.on( 'listening', function() {
	console.log( 'Listening on port ' + server.address().port );
});
