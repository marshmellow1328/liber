module.exports = function( db, mongojs ) {
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
				else {
					response.send( contentType );
				}
			}
		);
	};
	
	self.createContentType = function( request, response ) {
		//TODO pull data from request
		var contentType = {
			"name": "TestField",
			"fields": []
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
	};
	
	self.updateContentType = function( request, response ) {
		//TODO implement
		response.send( 501, { 'error': 'Not implemented' } );
	};
	
	self.deleteContentType = function( request, response ) {
		//TODO implement
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
