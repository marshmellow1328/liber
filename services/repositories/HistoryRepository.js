module.exports = function( db, mongojs ) {
	var self = this;
	var collection = db.history;

    self.createHistory = function( time, content, callback ) {
        var history = {
            versions: [
                {
                    created: time,
                    content: content
                }
            ]
        };
        collection.save( history, callback );
    };

    self.addToHistory = function( id, time, content, callback ) {
        console.log( id );
        console.log( id.toString() );
        collection.findAndModify(
            {
                query: { _id: mongojs.ObjectId( id ) },
                update: { $push: { versions: content } }
            },
            function( error, history ) {
                console.log( error );
                console.log( history );
                callback( error, history );
            }
        );
    };

	self.deleteHistory = function( contentId, callback ) {
		collection.remove( { _id: mongojs.ObjectId( contentId ) }, callback );
	};

};
