module.exports = function( db, mongojs ) {
	var self = this;

    self.retrieveContentTypes = function( request, response ) {
		db.contentTypes.find( function( error, content ) {
			response.send( content );
		});
	};

};
