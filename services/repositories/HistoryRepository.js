module.exports = function( db, mongojs ) {
	var self = this;

	/* public signature */
	self.createHistory = createHistory;
	self.addToHistory = addToHistory;
	self.deleteHistory = deleteHistory;

	/* private signature */
	var collection = db.history;

	/* public methods */
    function createHistory( time, content, callback ) {
        var history = {
            versions: [
                {
                    created: time,
                    content: content
                }
            ]
        };
        collection.save( history, callback );
    }

    function addToHistory( id, time, content, callback ) {
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
    }

	function deleteHistory( contentId, callback ) {
		collection.remove( { _id: mongojs.ObjectId( contentId ) }, callback );
	}

};
