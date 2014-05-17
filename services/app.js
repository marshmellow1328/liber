var express = require( 'express' );
var app = express();
var mongojs = require("mongojs");

app.use('/liber', express.static(__dirname + '/../app/'));
app.use( express.bodyParser() );

var db = initializeDb();
var ContentService = require( './ContentService.js' );
var contentService = new ContentService(db, mongojs);

function initializeDb() {
	var databaseUrl = "liber"; // "username:password@example.com/mydb"
	var collections = ["content", 'fields'];
	return mongojs.connect(databaseUrl, collections);	
}

app.get('/api/content', contentService.retrieveContent);
app.get('/api/content/:id', contentService.retrieveContentById);
app.post('/api/content', contentService.saveContent);

var API_PATH = '/api';
var ID_PATH = '/:id';

var FieldService = require( './FieldService.js' );
var fieldService = new FieldService( db, mongojs );

var FIELD_PATH = API_PATH + '/field';
var FIELD_ID_PATH = FIELD_PATH + ID_PATH;

app.get( FIELD_PATH, fieldService.retrieveFields );
app.get( FIELD_ID_PATH, fieldService.retrieveFieldById );
app.post( FIELD_PATH, fieldService.createField );
app.put( FIELD_ID_PATH, fieldService.updateField );
app.delete( FIELD_ID_PATH, fieldService.deleteField );

var ContentTypeService = require( './ContentTypeService.js' );
var contentTypeService = new ContentTypeService( db, mongojs );

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
