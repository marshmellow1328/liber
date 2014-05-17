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

var FieldService = require( './FieldService.js' );
var fieldService = new FieldService( db, mongojs );

app.get( '/api/field', fieldService.retrieveFields );
app.get( '/api/field/:id', fieldService.retrieveFieldById );
app.post( '/api/field', fieldService.createField );
app.put( '/api/field/:id', fieldService.updateField );
app.delete( '/api/field/:id', fieldService.deleteField );

var ContentTypeService = require( './ContentTypeService.js' );
var contentTypeService = new ContentTypeService( db, mongojs );

app.get( '/api/contentType', contentTypeService.retrieveContentTypes );
app.get( '/api/contentType/:id', contentTypeService.retrieveContentTypeById );
app.post( '/api/contentType', contentTypeService.createContentType );
app.put( '/api/contentType/:id', contentTypeService.updateContentType );
app.delete( '/api/contentType/:id', contentTypeService.deleteContentType );

var server = app.listen( 8080 );
server.on( 'listening', function() {
	console.log( "Listening on port " + server.address().port );
});
