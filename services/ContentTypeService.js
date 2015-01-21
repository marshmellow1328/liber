module.exports = function( contentTypeRepository ) {
	var self = this;

    self.retrieveContentTypes = function( request, response ) {
		contentTypeRepository.retrieveContentTypes(
            function( error, content ) {
                response.send( content );
            }
        );
	};

    self.retrieveContentTypeById = function( request, response ) {
		contentTypeRepository.retrieveContentTypeById(
            request.params.id,
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
        var contentType = request.body;
        contentType.createdDate = Date.now();

		contentTypeRepository.insertContentType(
            contentType,
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

    self.deleteContentType = function( request, response ) {
        var id = request.params.id;
		contentTypeRepository.deleteContentType(
			id,
			function( error, deleted ) {
				if( error ) {
					response.send( 500, { 'error': error.message } );
				}
				else {
					response.send( deleted );
				}
			}
		);
    };

};
