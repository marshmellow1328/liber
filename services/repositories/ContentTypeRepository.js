module.exports = function( db, mongojs ) {
	var self = this;
	var collection = db.contentTypes;

    self.retrieveContentTypes = function( callback ) {
        collection.find( callback );
    };

    self.retrieveContentTypeById = function( id, callback ) {
        console.log( 'Content type id - repository: ' + id );
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

    self.deleteContentType = function( id, callback ) {
        collection.remove(
			{ _id: mongojs.ObjectId( id ) },
            callback
        );
    };

};
