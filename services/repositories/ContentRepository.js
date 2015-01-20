module.exports = function( db, mongojs ) {
	var self = this;
	var collection = db.content;

    self.retrieveContent = function( callback ) {
        collection.find( callback );
    };

    self.retrieveContentById = function( id, callback ) {
        collection.findOne(
			{ _id: mongojs.ObjectId( id ) },
            callback
        );
    };

    self.insertContent = function( content, callback ) {
        collection.save( content, callback );
    };

    self.updateContent = function( content, callback ) {
        collection.findAndModify(
            {
                query: { _id: mongojs.ObjectId( content._id ) },
                update: {
                    $set: {
                        modifiedDate: Date.now(),
                        title: content.title,
                        fields: content.fields
                    }
                }
            },
            callback
        );
    };

    self.deleteContent = function( id, callback ) {
        db.content.remove(
			{ _id: mongojs.ObjectId( id ) },
            callback
        );
    };

};
