module.exports = function( db, mongojs, changeRepository, historyRepository ) {
	var self = this;
	var collection = db.content;
	var Promise = require( 'promise' );

    var createCallback = function( success, callback ) {
        return function( error, data ) {
            if( error ) {
                callback( error, null );
            }
            else {
                success();
            }
        };
    };

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
											updateContent( content, change, history, callback );
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

    self.deleteContent = function( id, callback ) {
        db.content.remove(
			{ _id: mongojs.ObjectId( id ) },
            callback
        );
    };

	var createChange = function( content, time ) {
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
	};

	var createHistory = function( content, change ) {
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
	};

	var changeStatusToHistoryComplete = function( change ) {
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
	};

	var createContent = function( content, history ) {
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
	};

	var updateContent = function( content, change, callback ) {
		collection.findAndModify(
			{
				query: { _id: content._id },
				update: {
					$set: {
						modifiedDate: change.created,
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
					changeStatusToComplete( change, callback );
				}
			}
		);
	};

	var changeStatusToComplete = function( change ) {
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
	};

};
