module.exports = function( db, mongojs ) {
	var self = this;
	var collection = db.fields;
	
	self.retrieveFields = function( request, response ) {
		collection.find(
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
		collection.findOne(
			{ _id: mongojs.ObjectId( id ) },
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
		var name = request.body.name;
		var type = request.body.type;
		var values = request.body.values;
		
		if( !name || !type ) {
			response.send( 400, { 'error': 'Missing name or type parameter' } );
		}
		else {
			var field = {
				name: name,
				type: type,
				values: values
			};
			collection.save( field, 
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
	
	self.updateField = function( request, response ) {
		var id = request.params.id;
		collection.findAndModify(
			{
				query: { _id: mongojs.ObjectId( id ) },
				update: { $set: { 	name: request.body.name, 
									type: request.body.type,
									values: request.body.values
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
	};
	
	self.deleteField = function( request, response ) {
		var id = request.params.id;
		collection.remove(
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
