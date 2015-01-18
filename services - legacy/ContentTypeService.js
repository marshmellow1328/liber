module.exports = function( db, mongojs, fieldRepository ) {
	var self = this;
	
	self.retrieveContentTypes = function( request, response ) {
		db.contentTypes.find(
			function( error, contentTypes ) {
				if( error ) {
					response.send( 500, { 'error': error.message } );
				}
				else {
					response.send( contentTypes );
				}
			}
		);
	};
	
	self.retrieveContentTypeById = function( request, response ) {
		var id = request.params.id;
		db.contentTypes.findOne(
			{ _id: mongojs.ObjectId( id ) },
			function( error, contentType ) {
				if( error ) {
					response.send( 500, { 'error': error.message } );
				}
				else if( contentType ) {
					var fields = [];
					
					var async = require( 'async' );
					async.each( 
						contentType.fields,
						function( field, callback ) {
							fieldRepository.retrieveFieldById( 
								field._id,
								function( error, field ) {
									if( error ) {
										callback( error );
									}
									else {
										fields.push( field );
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
								contentType.fields = fields;
								response.send( contentType );
							}
						}
					);
				}
			}
		);
	};
	
	self.createContentType = function( request, response ) {
		var name = request.body.name;
		var fields = request.body.fields;
		if( !name ) {
			response.send( 400, { 'error': 'Missing name parameter' } );
		}
		else {
			var contentType = {
				name: name,
				fields: fields
			};
			db.contentTypes.save( contentType, 
				function( error, saved ) {
					if( error ) {
						response.send( 500, { 'error': error.message } );
					}
					else {
						response.send( saved );
					}
				}
			);
		}
	};
	
	self.updateContentType = function( request, response ) {
		var id = request.params.id;
		delete request.body._id;
		console.log(request.body);
		db.contentTypes.findAndModify(
			{
				query: { _id: mongojs.ObjectId( id ) },
				update: request.body,
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
	};
	
	self.deleteContentType = function( request, response ) {
		var id = request.params.id;
		db.contentTypes.remove(
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
