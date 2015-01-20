module.exports = function( db, mongojs, fieldRepository ) {
	var self = this;
	
    self.retrieveContent = function( request, response ) {
		db.content.find( function( error, content ) {
			response.send( content );
		});
	};

    self.retrieveContentById = function( request, response ) {
		db.content.findOne(
			{ _id: mongojs.ObjectId( request.params.id ) },
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
								response.send( content );
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
		for ( var i=0; i < content.fields.length; i++ ) {
			var field = content.fields[i];
			fields.push(
                {
                    _id: field._id,
                    value: field.value
                }
            );
		}

        content.fields = fields;
        content.createdDate = Date.now();
		
		db.content.save( content, 
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
            /*var contentType = content.contentType;

            contentType.fields = [];
            for ( var i=0; i < request.body.fields.length; i++ ) {
                var field = request.body.contentType.fields[i];
                contentType.fields.push(
                    {
                        _id: field._id,
                        value: field.value
                    }
                );
            }*/

			db.content.findAndModify(
                {
                    query: { _id: mongojs.ObjectId( content._id ) },
                    update: {
                        $set: {
                            modifiedDate: Date.now(),
                            title: content.title,
                            fields: content.fields
                        }
                    }
                },
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
		db.content.remove(
			{ _id: mongojs.ObjectId( id ) },
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
