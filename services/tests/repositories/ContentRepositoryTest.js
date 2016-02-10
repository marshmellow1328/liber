var ContentRepository  = require( '../../repositories/ContentRepository' );
var mongojs = require( 'mongojs' );

describe( 'ContentRepository', function() {
    describe( 'insertContent(...)', function() {
        var db, changeRepository, historyRepository, contentRepository;

        beforeEach( function() {
            db = {};
            db.content = jasmine.createSpyObj( 'db', ['save'] );
            db.content.save.and.callFake(
                function( content, callback ) {
                    callback( null, content );
                }
            );
            changeRepository = jasmine.createSpyObj(
                'changeRepository',
                ['createChange', 'changeStatusToHistoryComplete', 'changeStatusToComplete']
            );
            changeRepository.createChange.and.callFake(
                function( time, content, callback ) {
                    callback( null, content );
                }
            );
            changeRepository.changeStatusToHistoryComplete.and.callFake(
                function( changeId, callback ) {
                    callback( null, {} );
                }
            );
            changeRepository.changeStatusToComplete.and.callFake(
                function( changeId, callback ) {
                    callback( null, changeId );
                }
            );
            historyRepository = jasmine.createSpyObj(
                'historyRepository',
                ['createHistory', 'addToHistory']
            );
            historyRepository.createHistory.and.callFake(
                function( time, content, callback ) {
                    callback( null, { _id: 123 } );
                }
            );
            contentRepository = new ContentRepository(
                db,
                null,
                changeRepository,
                historyRepository
            );
        } );

        it( 'fail creating change record', function( done ) {
            changeRepository.createChange.and.callFake(
                function( time, content, callback ) {
                    callback( 'something broke', null );
                }
            );
            var called = 0;
            contentRepository.insertContent(
                {},
                function( error, content ) {
                    called++;
                    expect( called ).toBe( 1 );
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete ).not.toHaveBeenCalled();
                    expect( changeRepository.changeStatusToComplete ).not.toHaveBeenCalled();
                    expect( historyRepository.createHistory ).not.toHaveBeenCalled();
                    expect( historyRepository.addToHistory ).not.toHaveBeenCalled();
                    expect( db.content.save ).not.toHaveBeenCalled();
                    done();
                }
            );
        } );
        it( 'fail creating history record', function( done ) {
            historyRepository.createHistory.and.callFake(
                function( time, content, callback ) {
                    callback( 'something broke', null );
                }
            );
            var called = 0;
            contentRepository.insertContent(
                {},
                function( error, content ) {
                    called++;
                    expect( called ).toBe( 1 );
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete ).not.toHaveBeenCalled();
                    expect( changeRepository.changeStatusToComplete ).not.toHaveBeenCalled();
                    expect( historyRepository.createHistory.calls.count() ).toBe( 1 );
                    expect( historyRepository.addToHistory ).not.toHaveBeenCalled();
                    expect( db.content.save ).not.toHaveBeenCalled();
                    done();
                }
            );
        } );
        it( 'fail updating change to history completed status', function( done ) {
            changeRepository.changeStatusToHistoryComplete.and.callFake(
                function( id, callback ) {
                    callback( 'something broke', null );
                }
            );
            historyRepository.createHistory.calls.reset();
            var called = 0;
            contentRepository.insertContent(
                {},
                function( error, content ) {
                    called++;
                    expect( called ).toBe( 1 );
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToComplete ).not.toHaveBeenCalled();
                    expect( historyRepository.createHistory.calls.count() ).toBe( 1 );
                    expect( db.content.save ).not.toHaveBeenCalled();
                    done();
                }
            );
        } );
        it( 'fail creating content', function( done ) {
            db.content.save.and.callFake(
                function( content, callback ) {
                    callback( 'something broke', null );
                }
            );

            contentRepository.insertContent(
                {},
                function( error, content ) {
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToComplete ).not.toHaveBeenCalled();
                    expect( historyRepository.createHistory.calls.count() ).toBe( 1 );
                    expect( db.content.save.calls.count() ).toBe( 1 );
                    done();
                }
            );
        } );
        it( 'fail updating change to completed status', function( done ) {
            changeRepository.changeStatusToComplete.and.callFake(
                function( id, callback ) {
                    callback( 'something broke', null );
                }
            );

            contentRepository.insertContent(
                {},
                function( error, content ) {
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToComplete.calls.count() ).toBe( 1 );
                    expect( historyRepository.createHistory.calls.count() ).toBe( 1 );
                    expect( db.content.save.calls.count() ).toBe( 1 );
                    done();
                }
            );
        } );
        it( 'happy day', function( done ) {
            contentRepository.insertContent(
                {},
                function( error, content ) {
                    expect( error ).toBe( null );
                    expect( content ).toEqual( { _id: 123 } );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToComplete.calls.count() ).toBe( 1 );
                    expect( historyRepository.createHistory.calls.count() ).toBe( 1 );
                    expect( db.content.save.calls.count() ).toBe( 1 );
                    done();
                }
            );
        } );
    } );
    describe( 'updateContent(...)', function() {
        var db, changeRepository, historyRepository, contentRepository;

        beforeEach( function() {
            db = {};
            db.content = jasmine.createSpyObj( 'db', ['findAndModify'] );
            db.content.findAndModify.and.callFake(
                function( content, callback ) {
                    callback( null, content ); //TODO update what we return. can't match param
                }
            );
            changeRepository = jasmine.createSpyObj(
                'changeRepository',
                ['createChange', 'changeStatusToHistoryComplete', 'changeStatusToComplete']
            );
            changeRepository.createChange.and.callFake(
                function( time, content, callback ) {
                    callback( null, content );
                }
            );
            changeRepository.changeStatusToHistoryComplete.and.callFake(
                function( changeId, callback ) {
                    callback( null, {} );
                }
            );
            changeRepository.changeStatusToComplete.and.callFake(
                function( changeId, callback ) {
                    callback( null, changeId );
                }
            );
            historyRepository = jasmine.createSpyObj(
                'historyRepository',
                ['createHistory', 'addToHistory']
            );
            historyRepository.addToHistory.and.callFake(
                function( id, time, content, callback ) {
                    callback( null, { _id: 123 } );
                }
            );
            contentRepository = new ContentRepository(
                db,
                mongojs,
                changeRepository,
                historyRepository
            );
        } );

        it( 'fail creating change record', function( done ) {
            changeRepository.createChange.and.callFake(
                function( time, content, callback ) {
                    callback( 'something broke', null );
                }
            );
            contentRepository.updateContent(
                { _id: 123 },
                function( error, content ) {
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete ).not.toHaveBeenCalled();
                    expect( changeRepository.changeStatusToComplete ).not.toHaveBeenCalled();
                    expect( historyRepository.createHistory ).not.toHaveBeenCalled();
                    expect( historyRepository.addToHistory ).not.toHaveBeenCalled();
                    expect( db.content.findAndModify ).not.toHaveBeenCalled();
                    done();
                }
            );
        } );
        it( 'fail adding to history record', function( done ) {
            var content = { _id: 123 };
            historyRepository.addToHistory.and.callFake(
                function( id, time, contentForHistory, callback ) {
                    callback( 'something broke', null );
                }
            );
            contentRepository.updateContent(
                { _id: 123 },
                function( error, content ) {
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete ).not.toHaveBeenCalled();
                    expect( changeRepository.changeStatusToComplete ).not.toHaveBeenCalled();
                    expect( historyRepository.createHistory ).not.toHaveBeenCalled();
                    expect( historyRepository.addToHistory.calls.count() ).toBe( 1 );
                    expect( db.content.findAndModify ).not.toHaveBeenCalled();
                    done();
                }
            );
        } );
        it( 'fail updating change to history completed status', function( done ) {
            changeRepository.changeStatusToHistoryComplete.and.callFake(
                function( id, callback ) {
                    callback( 'something broke', null );
                }
            );
            contentRepository.updateContent(
                { _id: 123 },
                function( error, content ) {
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToComplete ).not.toHaveBeenCalled();
                    expect( historyRepository.createHistory ).not.toHaveBeenCalled();
                    expect( historyRepository.addToHistory.calls.count() ).toBe( 1 );
                    expect( db.content.findAndModify ).not.toHaveBeenCalled();
                    done();
                }
            );
        } );
        it( 'fail updating content', function( done ) {
            db.content.findAndModify.and.callFake(
                function( content, callback ) {
                    callback( 'something broke', null );
                }
            );

            contentRepository.updateContent(
                { _id: 123 },
                function( error, content ) {
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToComplete ).not.toHaveBeenCalled();
                    expect( historyRepository.createHistory ).not.toHaveBeenCalled();
                    expect( historyRepository.addToHistory.calls.count() ).toBe( 1 );
                    expect( db.content.findAndModify.calls.count() ).toBe( 1 );
                    done();
                }
            );
        } );
        it( 'fail updating change to completed status', function( done ) {
            changeRepository.changeStatusToComplete.and.callFake(
                function( id, callback ) {
                    callback( 'something broke', null );
                }
            );

            contentRepository.updateContent(
                { _id: 123 },
                function( error, content ) {
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToComplete.calls.count() ).toBe( 1 );
                    expect( historyRepository.createHistory ).not.toHaveBeenCalled();
                    expect( historyRepository.addToHistory.calls.count() ).toBe( 1 );
                    expect( db.content.findAndModify.calls.count() ).toBe( 1 );
                    done();
                }
            );
        } );
        it( 'happy day', function( done ) {
            db.content.findAndModify.and.callFake(
                function( content, callback ) {
                    callback( null, { _id: 123 } );
                }
            );
            contentRepository.updateContent(
                { _id: 123 },
                function( error, content ) {
                    expect( error ).toBe( null );
                    expect( content ).toEqual( { _id: 123 } );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToComplete.calls.count() ).toBe( 1 );
                    expect( historyRepository.createHistory ).not.toHaveBeenCalled();
                    expect( historyRepository.addToHistory.calls.count() ).toBe( 1 );
                    expect( db.content.findAndModify.calls.count() ).toBe( 1 );
                    done();
                }
            );
        } );
    } );
    describe( 'deleteContent(...)', function() {
        var db, changeRepository, historyRepository, contentRepository;

        beforeEach( function() {
            db = {};
            db.content = jasmine.createSpyObj( 'db', ['remove'] );
            db.content.remove.and.callFake(
                function( query, callback ) {
                    callback();
                }
            );

            changeRepository = jasmine.createSpyObj(
                'changeRepository',
                ['createChange', 'changeStatusToHistoryComplete', 'deleteChanges']
            );
            changeRepository.createChange.and.callFake(
                function( time, content, callback ) {
                    callback( null, content );
                }
            );
            changeRepository.changeStatusToHistoryComplete.and.callFake(
                function( changeId, callback ) {
                    callback( null, {} );
                }
            );
            changeRepository.deleteChanges.and.callFake(
                function( changeId, callback ) {
                    callback( null, changeId );
                }
            );

            historyRepository = jasmine.createSpyObj( 'historyRepository', ['deleteHistory'] );
            historyRepository.deleteHistory.and.callFake(
                function( id, callback ) {
                    callback( null );
                }
            );

            contentRepository = new ContentRepository( db, mongojs, changeRepository, historyRepository );
        } );

        it( 'fail creating change record', function( done ) {
            changeRepository.createChange.and.callFake(
                function( time, content, callback ) {
                    callback( 'something broke', null );
                }
            );

            contentRepository.deleteContent(
                123,
                function( error ) {
                    expect( error ).toBe( 'something broke' );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete ).not.toHaveBeenCalled();
                    expect( changeRepository.deleteChanges ).not.toHaveBeenCalled();
                    expect( historyRepository.deleteHistory ).not.toHaveBeenCalled();
                    expect( db.content.remove ).not.toHaveBeenCalled();
                    done();
                }
            );
        } );
        it( 'fail deleting history record', function( done ) {
            historyRepository.deleteHistory.and.callFake(
                function( id, callback ) {
                    callback( 'something broke', null );
                }
            );

            contentRepository.deleteContent(
                123,
                function( error ) {
                    expect( error ).toBe( 'something broke' );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete ).not.toHaveBeenCalled();
                    expect( changeRepository.deleteChanges ).not.toHaveBeenCalled();
                    expect( historyRepository.deleteHistory.calls.count() ).toBe( 1 );
                    expect( db.content.remove ).not.toHaveBeenCalled();
                    done();
                }
            );
        } );
        it( 'fail updating change to history completed status', function( done ) {
            changeRepository.changeStatusToHistoryComplete.and.callFake(
                function( id, callback ) {
                    callback( 'something broke', null );
                }
            );
            contentRepository.deleteContent(
                123,
                function( error, content ) {
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( historyRepository.deleteHistory.calls.count() ).toBe( 1 );
                    expect( db.content.remove ).not.toHaveBeenCalled();
                    done();
                }
            );
        } );
        it( 'fail deleting content', function( done ) {
            db.content.remove.and.callFake(
                function( content, callback ) {
                    callback( 'something broke', null );
                }
            );

            contentRepository.deleteContent(
                123,
                function( error, content ) {
                    expect( error ).toBe( 'something broke' );
                    expect( content ).toBe( null );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( historyRepository.deleteHistory.calls.count() ).toBe( 1 );
                    expect( db.content.remove.calls.count() ).toBe( 1 );
                    done();
                }
            );
        } );
        it( 'fail deleting changes', function( done ) {
            changeRepository.deleteChanges.and.callFake(
                function( id, callback ) {
                    expect( id ).toBe( 123 );
                    callback( 'something broke' );
                }
            );

            contentRepository.deleteContent(
                123,
                function( error ) {
                    expect( error ).toBe( 'something broke' );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( changeRepository.deleteChanges.calls.count() ).toBe( 1 );
                    expect( historyRepository.deleteHistory.calls.count() ).toBe( 1 );
                    expect( db.content.remove.calls.count() ).toBe( 1 );
                    done();
                }
            );
        } );
        it( 'happy day', function( done ) {
            contentRepository.deleteContent(
                123,
                function( error ) {
                    expect( error ).toBe( undefined );
                    expect( changeRepository.createChange.calls.count() ).toBe( 1 );
                    expect( changeRepository.changeStatusToHistoryComplete.calls.count() ).toBe( 1 );
                    expect( changeRepository.deleteChanges.calls.count() ).toBe( 1 );
                    expect( historyRepository.deleteHistory.calls.count() ).toBe( 1 );
                    expect( db.content.remove.calls.count() ).toBe( 1 );
                    done();
                }
            );
        } );
    } );
} );
