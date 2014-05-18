module.exports = function( db, mongojs ) {
	var self = this;
	var collection = db.fields;
	
	self.retrieveFields = function( callback ) {
		collection.find( callback );
	};
	
	self.retrieveFieldById = function( id, callback ) {
		collection.findOne( { _id: mongojs.ObjectId( id ) }, callback );
	};
	
	self.insertField = function( field, callback ) {
		collection.save( field, callback );
	};
	
	self.updateField = function( field, callback ) {
		var id = field._id;
		delete field._id;
		collection.findAndModify(
			{
				query: { _id: mongojs.ObjectId( id ) },
				update: field,
			},
			callback
		);
	};
	
	self.deleteField = function( id, callback ) {
		collection.remove( { _id: mongojs.ObjectId( id ) }, callback );
	};
	
}
