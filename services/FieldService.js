module.exports = function( db, mongojs ) {
	var self = this;
	
	self.retrieveFields = function( request, response ) {
		db.fields.find(
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
		db.fields.findOne(
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
		}
	};
	
	self.updateField = function( request, response ) {
		var id = request.params.id;
		db.fields.findAndModify(
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
	
	self.deleteField = function( request, response ) {
		var id = request.params.id;
		db.fields.remove(
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
