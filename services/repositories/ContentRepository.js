module.exports = function( db, mongojs ) {
	var self = this;
	var collection = db.content;
    var ChangeRepository = require( './ChangeRepository' );
    var changeRepository = new ChangeRepository( db, mongojs );
    var HistoryRepository = require( './HistoryRepository' );
    var historyRepository = new HistoryRepository( db, mongojs );

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
//        collection.save( content, callback );
        var time = Date.now();
        //TODO create change
        //TODO add to history record
        //TODO update change status to history completed
        //TODO update content
        //TODO update change status to complete
        changeRepository.createChange(
            time,
            content,
            function( error, change ) {
                if( error ) {
                    callback( error, null );
                }
                else {
                    historyRepository.createHistory(
                        time,
                        content,
                        function( error, history ) {
                            if( error ) {
                                callback( error, null );
                            }
                            else {
                                changeRepository.changeStatusToHistoryComplete(
                                    change._id,
                                    function( error, change ) {
                                        if( error ) {
                                            callback( error, null );
                                        }
                                        else {
                                            content._id = history._id;
                                            collection.save(
                                                content,
                                                function( error, content ) {
                                                    if( error ) {
                                                        callback( error );
                                                    }
                                                    else {
                                                        changeRepository.changeStatusToComplete(
                                                            change._id,
                                                            callback
                                                        );
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    };

    self.updateContent = function( content, callback ) {
        var id = mongojs.ObjectId( content._id );
        var time = Date.now();
        //TODO create change
        //TODO add to history record
        //TODO update change status to history completed
        //TODO update content
        //TODO update change status to complete
        changeRepository.createChange(
            time,
            content,
            function( error, change ) {
                if( error ) {
                    callback( error, null );
                }
                else {
                    historyRepository.addToHistory(
                        id,
                        time,
                        content,
                        function( error, history ) {
                            if( error ) {
                                callback( error, null );
                            }
                            else {
                                changeRepository.changeStatusToHistoryComplete(
                                    change._id,
                                    function( error, change ) {
                                        if( error ) {
                                            callback( error, null );
                                        }
                                        else {
                                            collection.findAndModify(
                                                {
                                                    query: { _id: id },
                                                    update: {
                                                        $set: {
                                                            modifiedDate: time,
                                                            title: content.title,
                                                            fields: content.fields
                                                        }
                                                    }
                                                },
                                                function( error, content ) {
                                                    if( error ) {
                                                        callback( error );
                                                    }
                                                    else {
                                                        changeRepository.changeStatusToComplete(
                                                            change._id,
                                                            callback
                                                        );
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
//        collection.findAndModify(
//            {
//                query: { _id: id },
//                update: {
//                    $set: {
//                        modifiedDate: time,
//                        title: content.title,
//                        fields: content.fields
//                    }
//                }
//            },
//            callback
//        );
    };

    self.deleteContent = function( id, callback ) {
        db.content.remove(
			{ _id: mongojs.ObjectId( id ) },
            callback
        );
    };

};
