module.exports = function( db, mongojs, changeRepository, historyRepository ) {
	var self = this;

	/* public signature */
	self.retrieveContent = retrieveContent;
	self.retrieveContentById = retrieveContentById;
	self.insertContent = insertContent;
	self.updateContent = updateContent;
	self.deleteContent = deleteContent;

	/* private fields */
	var collection = db.content;
	var Promise = require( 'promise' );

	/* public methods */
	function retrieveContent( callback ) {
        collection.find( callback );
    }

    function retrieveContentById( id, callback ) {
        collection.findOne(
			{ _id: mongojs.ObjectId( id ) },
            callback
        );
    }

    function insertContent( content, callback ) {
        var time = Date.now();

		createChange( content, time ).then(
			function( change ) {
				return createHistory( content, change, callback ).then(
					function( history ) {
						return changeStatusToHistoryComplete( change ).then(
							function( change ) {
								return createContent( content, history ).then(
									function( savedContent ) {
										return changeStatusToComplete( change ).then(
											function( change ) {
												callback( null, savedContent );
											}
										);
									}
								);
							}
						);
					}
				);
			}
		).catch(
			function( error ) {
				callback( error, null );
			}
		);
    }

    function updateContent( content, callback ) {
        var id = mongojs.ObjectId( content._id );
        var time = Date.now();

		createChange( time, content ).then(
			function( change ) {
				return addToHistory( id, time, content ).then(
					function( history ) {
						changeStatusToHistoryComplete( change ).then(
							function( change ) {
								return updateContentDocument( content, change, callback ).then(
									function( savedContent ) {
										return changeStatusToComplete( change ).then(
											function( change ) {
												callback( null, savedContent );
											}
										);
									}
								);
							}
						);
					}
				);
			}
		).catch(
			function( error ) {
				callback( error, null );
			}
		);
    }

    function deleteContent( id, callback ) {
        db.content.remove(
			{ _id: mongojs.ObjectId( id ) },
            callback
        );
    }

	/* private methods */
    function createCallback( success, callback ) {
        return function( error, data ) {
            if( error ) {
                callback( error, null );
            }
            else {
                success();
            }
        };
    }

	function createChange( content, time ) {
		return new Promise(
			function( fulfill, reject ) {
				changeRepository.createChange(
					time,
					content,
					function( error, change ) {
						if( error ) {
							reject( error );
						}
						else {
							fulfill( change );
						}
					}
				);
			}
		);
	}

	function createHistory( content, change ) {
		return new Promise(
			function( fulfill, reject ) {
				historyRepository.createHistory(
					change.created,
					content,
					function( error, history ) {
						if( error ) {
							reject( error );
						}
						else {
							fulfill( history );
						}
					}
				);
			}
		);
	}

	function addToHistory( id, time, content ) {
		return new Promise(
			function( fulfill, reject ) {
				historyRepository.addToHistory(
					id,
					time,
					content,
					function( error, history ) {
						if( error ) {
							reject( error );
						}
						else {
							fulfill( history );
						}
					}
				);
			}
		);
	}

	function changeStatusToHistoryComplete( change ) {
		return new Promise(
			function( fulfill, reject ) {
				changeRepository.changeStatusToHistoryComplete(
					change._id,
					function( error, change ) {
						if( error ) {
							reject( error );
						}
						else {
							fulfill( change );
						}
					}
				);
			}
		);
	}

	function createContent( content, history ) {
		return new Promise(
			function( fulfill, reject ) {
				content._id = history._id;
				collection.save(
					content,
					function( error, content ) {
						if( error ) {
							reject( error );
						}
						else {
							fulfill( content );
						}
					}
				);
			}
		);
	}

	function updateContentDocument( content, change, callback ) {
		return new Promise(
			function( fulfill, reject ) {
				collection.findAndModify(
					{
						query: { _id: mongojs.ObjectId( content._id ) },
						update: {
							$set: {
								modifiedDate: change.created,
								title: content.title,
								fields: content.fields
							}
						}
					},
					function( error, content ) {
						if( error || content === null ) {
							reject( error );
						}
						else {
							fulfill( content );
						}
					}
				);
			}
		);
	}

	function changeStatusToComplete( change ) {
		return new Promise(
			function( fulfill, reject ) {
				changeRepository.changeStatusToComplete(
					change._id,
					function( error, change ) {
						if( error ) {
							reject( error );
						}
						else {
							fulfill( change );
						}
					}
				);
			}
		);
	}

};
