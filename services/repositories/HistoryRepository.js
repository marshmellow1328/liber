module.exports = function( db, mongojs ) {
	var self = this;

	/* public signature */
	self.retrieveHistoryById = retrieveHistoryById;
	self.createHistory = createHistory;
	self.addToHistory = addToHistory;
	self.deleteHistory = deleteHistory;

	/* private signature */
	var collection = db.history;

	/* public methods */
	function retrieveHistoryById( id, callback ) {
        collection.findOne(
			{ _id: mongojs.ObjectId( id ) },
            callback
        );
	}

    function createHistory( time, content, callback ) {
		var version = _createVersion( content, time );
        var history = { versions: [ version ] };
        collection.save( history, callback );
    }

    function addToHistory( id, time, content, callback ) {
        console.log( id );
        console.log( id.toString() );
        collection.findAndModify(
            {
                query: { _id: mongojs.ObjectId( id ) },
                update: { $push: { versions: _createVersion( content, time ) } }
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

	/* private methods */
	function _createVersion( content, time ) {
		return {
			createdDate: time,
			content: content
		};
	}

};
