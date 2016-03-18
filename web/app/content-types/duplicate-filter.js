angular.module( 'duplicate-filter', [] ).filter(
    'duplicate',
    function() {
        return function( items, selectedItems ) {
            var filteredItems = [];
            if( items ) {
                for( var i = 0; i < items.length; i++ ) {
                    var item = items[i];
                    var selected = false;
                    for( var j=0; j < selectedItems.length; j++ ) {
                        if( selectedItems[j]._id === item._id ) {
                            selected = true;
                        }
                    }
                    if( !selected ) {
                        filteredItems.push( item );
                    }
                }
            }
            return filteredItems;
        };
    }
);
