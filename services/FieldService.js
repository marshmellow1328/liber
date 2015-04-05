module.exports = function( fieldRepository ) {
	var self = this;

    self.retrieveFields = function( request, response ) {
		fieldRepository.retrieveFields(
			function( error, fields ) {
				if( error ) {
					response.send( 500, { 'error': error.message } );
				}
				else {
					response.send( fields );
				}
			}
		);
	};

    self.retrieveFieldById = function( request, response ) {
		var id = request.params.id;
		fieldRepository.retrieveFieldById(
			id,
			function( error, field ) {
				if( error ) {
					response.send( 500, { 'error': error.message } );
				}
				else {
					response.send( field );
				}
			}
		);
	};

	self.createField = function( request, response ) {
        var field = request.body;
        field.createdDate = Date.now();

		fieldRepository.insertField(
            field,
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

    self.updateField = function( request, response ) {
        if( !( request.body._id ) ) {
			response.send( 400, { 'error': 'Invalid request' } );
		}
		else {
            var field = request.body;
			fieldRepository.updateField(
                field,
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

    self.deleteField = function( request, response ) {
		var id = request.params.id;
		fieldRepository.deleteField(
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
