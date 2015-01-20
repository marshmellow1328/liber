var express = require( 'express' );
var app = express();
var mongojs = require( 'mongojs' );

app.use( express.json() );

function initializeDb() {
	var databaseUrl = 'liber'; // "username:password@example.com/mydb"
	var collections = [ 'content', 'contentTypes', 'fields' ];
	return mongojs.connect( databaseUrl, collections );
}

var db = initializeDb();
var FieldRepository = require( './repositories/FieldRepository.js' );
var fieldRepository = new FieldRepository( db, mongojs );

var ContentService = require( './ContentService.js' );
var contentService = new ContentService( db, mongojs, fieldRepository );

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
var fieldService = new FieldService( fieldRepository );

app.get( FIELD_PATH, fieldService.retrieveFields );
app.get( FIELD_ID_PATH, fieldService.retrieveFieldById );
app.post( FIELD_PATH, fieldService.createField );
app.delete( FIELD_ID_PATH, fieldService.deleteField );

var CONTENT_TYPE_PATH = API_PATH + '/content-types';
var CONTENT_TYPE_ID_PATH = CONTENT_TYPE_PATH + ID_PATH;

var ContentTypeService = require( './ContentTypeService.js' );
var contentTypeService = new ContentTypeService( db, mongojs );

app.get( CONTENT_TYPE_PATH, contentTypeService.retrieveContentTypes );
app.post( CONTENT_TYPE_PATH, contentTypeService.createContentType );

var server = app.listen( 8081 );
server.on( 'listening', function() {
	console.log( 'Listening on port ' + server.address().port );
});
