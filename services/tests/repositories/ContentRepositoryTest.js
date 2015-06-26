var ContentRepository  = require( '../../repositories/ContentRepository' );

describe( 'ContentRepository', function() {
    describe( 'insertContent(...)', function() {
        var db, changeRepository, historyRepository, contentRepository;

        beforeEach( function() {
            db = {};
            db.content = jasmine.createSpyObj( 'db', ['save'] );
            changeRepository = jasmine.createSpyObj(
                'changeRepository',
                ['createChange', 'changeStatusToHistoryComplete']
            );
            changeRepository.createChange.and.callFake(
                function( time, content, callback ) {
                    callback( null, content );
                }
            );
            changeRepository.changeStatusToHistoryComplete.and.callFake(
                function() {
                    callback( null, content );
                }
            );
            historyRepository = jasmine.createSpyObj(
                'historyRepository',
                ['createHistory', 'addToHistory']
            );
            historyRepository.createHistory.and.callFake(
                function( time, content, callback ) {
                    callback( null, content );
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
                    expect( historyRepository.createHistory.calls.count() ).toBe( 1 );
                    expect( db.content.save ).not.toHaveBeenCalled();
                    done();
                }
            );
        } );
        xit( 'fail creating content', function( done ) {
            expect( false ).toBe( true );
            done();
        } );
        xit( 'fail updating change to completed status', function( done ) {
            expect( false ).toBe( true );
            done();
        } );
    } );
} );
