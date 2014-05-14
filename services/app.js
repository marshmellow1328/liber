var express = require( 'express' );
var app = express();

//app.use('/earmuffs', express.static(__dirname + '/../earmuffs-app/www/app'));
app.use( express.bodyParser() );

var db = initializeDb();
var ContentService = require( './ContentService.js' );
var contentService = new ContentService(db);

function initializeDb() {
	var databaseUrl = "liber"; // "username:password@example.com/mydb"
	var collections = ["content"]
	return require("mongojs").connect(databaseUrl, collections);	
}

app.get('/api/content', contentService.retrieveContent);
app.get('/api/content/:id', contentService.retrieveContentById);
app.post('/api/content', contentService.saveContent);

var server = app.listen( 8080, 'localhost' );
server.on( 'listening', function() {
	console.log( "Listening on port " + server.address().port );
});
