module.exports = function(db) {
	var self = this;
	
	var ObjectId = require('mongodb').ObjectID;
	
	self.retrieveContent = function(request, response) {
		db.content.find(function(err, content) {
			response.send(content);
		});
	}
	
	self.retrieveContentById = function(request, response) {
		db.content.find({_id: ObjectId(request.params.id)}, function(err, content) {
			response.send(content);
		});
	}
	
	self.saveContent = function(request, response) {
		var data = {
				"name": "Blah",
				"author": "Shawn"
		};
		db.content.save( data, function( err, saved ) {
			response.send(saved);
		} );
	}
};
