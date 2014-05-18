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
			{ _id: mongo.js.ObjectId( id ) },
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
		//TODO pull data from request
		var field = {
			"name": "TestField",
			"type": "text"
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
	};
	
	self.updateField = function( request, response ) {
		//TODO implement
		response.send( 501, { 'error': 'Not implemented' } );
	};
	
	self.deleteField = function( request, response ) {
		//TODO implement
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
