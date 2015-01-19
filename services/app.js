var express = require( 'express' );
var app = express();
var mongojs = require( 'mongojs' );

app.use( '/liber', express.static( __dirname + '/../web/app/' ) );
app.use( express.json() );

function initializeDb() {
	var databaseUrl = 'liber'; // "username:password@example.com/mydb"
	var collections = [ 'content', 'fields' ];
	return mongojs.connect( databaseUrl, collections );
}

var db = initializeDb();

var ContentService = require( './ContentService.js' );
var contentService = new ContentService( db, mongojs );

var API_PATH = '/api';
var ID_PATH = '/:id';

var CONTENT_PATH = API_PATH + '/content';
var CONTENT_ID_PATH = CONTENT_PATH + ID_PATH;

app.get( CONTENT_PATH, contentService.retrieveContent );
app.get( CONTENT_ID_PATH, contentService.retrieveContentById );
app.post( CONTENT_PATH, contentService.createContent );
app.put( CONTENT_ID_PATH, contentService.updateContent );
app.delete( CONTENT_ID_PATH, contentService.deleteContent );

var FIELD_PATH = API_PATH + '/fields';
var FIELD_ID_PATH = FIELD_PATH + ID_PATH;

var FieldService = require( './FieldService.js' );
var fieldService = new FieldService( db, mongojs );

app.get( FIELD_PATH, fieldService.retrieveFields );
app.post( FIELD_PATH, fieldService.createField );

var server = app.listen( 8080 );
server.on( 'listening', function() {
	console.log( 'Listening on port ' + server.address().port );
});
