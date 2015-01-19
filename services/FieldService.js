module.exports = function( db, mongojs ) {
	var self = this;

    self.retrieveFields = function( request, response ) {
		db.fields.find( function( error, content ) {
			response.send( content );
		});
	};

	self.createField = function( request, response ) {
        var field = request.body;
        field.createdDate = Date.now();

		db.fields.save( field,
			function( error, saved ) {
				if( error ) {
					response.send( 500, { 'error': error.message } );
				}
				else {
					response.send( saved );
				}
			}
		);
	};

};
