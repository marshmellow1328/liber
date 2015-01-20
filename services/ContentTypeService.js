module.exports = function( db, mongojs ) {
	var self = this;

    self.retrieveContentTypes = function( request, response ) {
		db.contentTypes.find( function( error, content ) {
			response.send( content );
		});
	};

    self.retrieveContentTypeById = function( request, response ) {
		db.contentTypes.findOne(
			{ _id: mongojs.ObjectId( request.params.id ) },
			function( error, contentType ) {
                if( error ) {
					response.send( 500, { 'error': error.message } );
				}
				else {
					response.send( contentType );
				}
			}
		);
	};

	self.createContentType = function( request, response ) {
        var type = request.body;
        type.createdDate = Date.now();

		db.contentTypes.save( type,
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
