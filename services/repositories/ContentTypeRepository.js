module.exports = function( db, mongojs ) {
	var self = this;
	var collection = db.contentTypes;

    self.retrieveContentTypes = function( callback ) {
        collection.find( callback );
    };

    self.retrieveContentTypeById = function( id, callback ) {
        collection.findOne(
			{ _id: mongojs.ObjectId( id ) },
            callback
        );
    };

    self.insertContentType = function( contentType, callback ) {
        collection.save(
            contentType,
            callback
        );
    };

};
