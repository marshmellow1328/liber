var restify = require( 'restify' );
var Sequelize = require( 'sequelize' );

var configFile = './config.json';

var fs = require( 'fs' );
var config = JSON.parse( fs.readFileSync( configFile ) );
initializeApp( config );

function initializeApp( config ) {
	initializePersistence( config );
	initializeServer( config );
}

function initializePersistence( config ) {
	sequelize = new Sequelize( config.databaseName, config.databaseUserName, config.databasePassword );
	Article = sequelize.define( 'article', 
									{
										id: Sequelize.INTEGER,
										name: Sequelize.STRING
									},
									{
										tableName: 'article'
									} );
}

function initializeServer( config ) {
	var retrieveArticles = function( request, response, next ) {
		Article.findAll().success( function( articles ) { response.send( articles ); } );
	};
	var retrieveArticle = function( request, response, next ) {
		var id = request.params.id;
		Article.find( id ).success( function( article ) { response.send( article ); } );
	};

	var server = restify.createServer();
	server.get( '/articles', retrieveArticles );
	server.get( '/articles/:id', retrieveArticle );

	server.listen( config.port, config.host, function() {
		console.log( '%s listening at %s', server.name, server.url );
	} );
}
