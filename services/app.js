var express = require( 'express' );
var app = express();
var mongojs = require( 'mongojs' );

app.use( '/liber', express.static( __dirname + '/../web/app/' ) );
app.use( express.json() );

var db = initializeDb();

var ContentService = require( './ContentService.js' );
var contentService = new ContentService( db, mongojs );

function initializeDb() {
	var databaseUrl = 'liber'; // "username:password@example.com/mydb"
	var collections = [ 'content' ];
	return mongojs.connect( databaseUrl, collections );
}

var API_PATH = '/api';
var CONTENT_PATH = API_PATH + '/content';

app.post( CONTENT_PATH, contentService.createContent );

var server = app.listen( 8080 );
server.on( 'listening', function() {
	console.log( "Listening on port " + server.address().port );
});
