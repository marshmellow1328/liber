var express = require( 'express' );
var app = express();
var mongojs = require("mongojs");

app.use('/liber', express.static(__dirname + '/../web/src/'));
app.use( express.json() );

var db = initializeDb();
var FieldRepository = require( './repositories/FieldRepository.js' );
var fieldRepository = new FieldRepository( db, mongojs );

var ContentService = require( './ContentService.js' );
var contentService = new ContentService(db, mongojs);

function initializeDb() {
	var databaseUrl = "liber"; // "username:password@example.com/mydb"
	var collections = ["content", 'fields', 'contentTypes'];
	return mongojs.connect(databaseUrl, collections);	
}

var API_PATH = '/api';
var ID_PATH = '/:id';

var CONTENT_PATH = API_PATH + '/content';
var CONTENT_ID_PATH = CONTENT_PATH + ID_PATH;

app.get( CONTENT_PATH, contentService.retrieveContent );
app.get( CONTENT_ID_PATH, contentService.retrieveContentById );
app.post( CONTENT_PATH, contentService.createContent );
app.delete( CONTENT_ID_PATH, contentService.deleteContent );

var FieldService = require( './FieldService.js' );
var fieldService = new FieldService( db, mongojs, fieldRepository );

var FIELD_PATH = API_PATH + '/field';
var FIELD_ID_PATH = FIELD_PATH + ID_PATH;

app.get( FIELD_PATH, fieldService.retrieveFields );
app.get( FIELD_ID_PATH, fieldService.retrieveFieldById );
app.post( FIELD_PATH, fieldService.createField );
app.put( FIELD_ID_PATH, fieldService.updateField );
app.delete( FIELD_ID_PATH, fieldService.deleteField );

var ContentTypeService = require( './ContentTypeService.js' );
var contentTypeService = new ContentTypeService( db, mongojs, fieldRepository );

var CONTENT_TYPE_PATH = API_PATH + '/contentType';
var CONTENT_TYPE_ID_PATH = CONTENT_TYPE_PATH + ID_PATH;

app.get( CONTENT_TYPE_PATH, contentTypeService.retrieveContentTypes );
app.get( CONTENT_TYPE_ID_PATH, contentTypeService.retrieveContentTypeById );
app.post( CONTENT_TYPE_PATH, contentTypeService.createContentType );
app.put( CONTENT_TYPE_ID_PATH, contentTypeService.updateContentType );
app.delete( CONTENT_TYPE_ID_PATH, contentTypeService.deleteContentType );

var server = app.listen( 8080 );
server.on( 'listening', function() {
	console.log( "Listening on port " + server.address().port );
});
