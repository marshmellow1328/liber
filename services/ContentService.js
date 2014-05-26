module.exports = function(db, mongojs) {
	var self = this;
	
	self.retrieveContent = function(request, response) {
		db.content.find(function(err, content) {
			response.send(content);
		});
	};
	
	self.retrieveContentById = function(request, response) {
		db.content.findOne(
			{ _id: mongojs.ObjectId( request.params.id ) }, 
			function(err, content) {
				response.send(content);
			}
		);
	};
	
	self.createContent = function(request, response) {
		var fields = [];		
		for ( var i=0; i<request.body.contentType.fields.length; i++ ) {
			var field = request.body.contentType.fields[i];
			fields.push( {
				"_id": field._id,
				"value": field.value
			} );
		}
		
		var content = {
			contentType: {
				"_id": request.body.contentType._id,
			},
			fields: fields
		};
		
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
