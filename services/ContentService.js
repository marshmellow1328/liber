module.exports = function( contentRepository, fieldRepository, contentTypeRepository ) {
	var self = this;
	
    self.retrieveContent = function( request, response ) {
		contentRepository.retrieveContent(
            function( error, content ) {
                response.send( content );
            }
        );
	};

    self.retrieveContentById = function( request, response ) {
		contentRepository.retrieveContentById(
            request.params.id,
            function( error, content ) {
                if( error ) {
					response.send( 500, { 'error': error.message } );
				}
				else if( content ) {
					var async = require( 'async' );
					async.each(
						content.fields,
						function( field, callback ) {
							fieldRepository.retrieveFieldById(
								field._id,
								function( error, fieldDefinition ) {
									if( error ) {
										callback( error );
									}
									else {
                                        field.name = fieldDefinition.name;
										field.type = fieldDefinition.type;
                                        field.values = fieldDefinition.values;
										callback();
									}
								}
							);
						},
						function( error ) {
							if( error ) {
								response.send( 500, { 'error': error.message } );
							}
							else {
                                console.log( 'Content type id: ' + content.contentType );
                                contentTypeRepository.retrieveContentTypeById(
                                    content.contentType,
                                    function( error, contentType ) {
                                        content.contentType = {
                                            _id: contentType._id,
                                            name: contentType.name
                                        };
                                        response.send( content );
                                    }
                                );
							}
						}
					);
				}
			}
        );
	};

	self.createContent = function( request, response ) {
        var content = request.body;

        var fields = [];
		for ( var i = 0; i < content.fields.length; i++ ) {
			var field = content.fields[ i ];
			fields.push(
                {
                    _id: field._id,
                    value: field.value
                }
            );
		}

        content.fields = fields;
        content.createdDate = Date.now();

		contentRepository.insertContent(
            content,
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

    self.updateContent = function( request, response ) {
        if( !( request.body._id ) ) {
			response.send( 400, { 'error': 'Invalid request' } );
		}
		else {
            var content = request.body;
			contentRepository.updateContent(
                content,
                function( error, updated ) {
                    if( error ) {
                        response.send( 500, { 'error': error.message } );
                    }
                    else {
                        response.send( updated );
                    }
                }
			);
		}
	};

    self.deleteContent = function( request, response ) {
		var id = request.params.id;
		contentRepository.deleteContent(
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
