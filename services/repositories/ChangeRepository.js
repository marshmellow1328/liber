module.exports = function( db, mongojs ) {
	var self = this;
	var collection = db.changes;

    var changeStatus = function( id, status, callback ) {
        collection.findAndModify(
            {
                query: { _id: id },
                update: { $set: { status: status } }
            },
            callback
        );
    };

    self.createChange = function( time, content, callback ) {
        var change = {
            created: time,
            status: 'new',
            content: content
        };
        collection.save( change, callback );
    };

    self.changeStatusToHistoryComplete = function( id, callback ) {
        changeStatus( id, 'history-complete', callback );
    };

    self.changeStatusToComplete = function( id, callback ) {
        changeStatus( id, 'complete', callback );
    };

	self.deleteChanges = function( contentId, callback ) {
		collection.remove( { 'content._id': contentId }, callback );
	};

};
