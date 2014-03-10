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
	Content = sequelize.define( 'content', 
									{
										id: Sequelize.INTEGER,
										name: Sequelize.STRING
									},
									{
										tableName: 'article'
									} );
	ContentVersion = sequelize.define( 'contentVersion',
										{
											id: Sequelize.INTEGER
										},
										{
											tableName: 'article_version',
											timestamps: false
										} );
	ContentVersion.hasOne( Content, { as: 'latestVersion', foreignKey: 'latest_version' } );
	Content.belongsTo( ContentVersion, { as: 'latestVersion', foreignKey: 'latest_version' } );
	ContentFieldValue = sequelize.define( 'contentFieldValue',
											{
												id: Sequelize.INTEGER,
												value: Sequelize.STRING
											},
											{
												tableName: 'content_field_value',
												timestamps: false
											} );
	ContentVersion.hasMany( ContentFieldValue, { foreignKey: 'article_version_id' } );
}

function initializeServer( config ) {
	var retrieveContents = function( request, response, next ) {
		Content.findAll( { include: [{
										model: ContentVersion, 
										as: 'latestVersion', 
										include: [{ model: ContentFieldValue }] }] } ).success( 
			function( contents ) {
				var restfulContents = contents.map(
					function( content ) {
						var newContent = {};
						newContent.id = content.id;
						newContent.name = content.name;
						newContent.fields = content.latestVersion.contentFieldValues.map(
							function( contentFieldValue ) {
								var field = {};
								//field.name = contentFieldValue.name;
								//field.type = contentFieldValue.type;
								field.value = contentFieldValue.value;
								return field;
							}
						);
						return newContent;
					}
				);
				response.send( restfulContents );
			}
		);
	};
	var retrieveContent = function( request, response, next ) {
		var id = request.params.id;
		Content.find( id ).success( function( content ) { response.send( content ); } );
	};

	var server = restify.createServer();
	server.get( '/articles', retrieveContents );
	server.get( '/articles/:id', retrieveContent );

	server.listen( config.port, config.host, function() {
		console.log( '%s listening at %s', server.name, server.url );
	} );
}
