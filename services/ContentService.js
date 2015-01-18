module.exports = function( db, mongojs ) {
	var self = this;
	
    self.retrieveContent = function( request, response ) {
		db.content.find( function( err, content ) {
			response.send( content );
		});
	};

	self.createContent = function( request, response ) {
        var content = request.body;
        content.createdDate = new Date();
		
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

};
