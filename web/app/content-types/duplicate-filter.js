angular.module( 'duplicate-filter', [] ).filter(
    'duplicate',
    function() {
        return function( items, currentIndex, selectedItems ) {
            var filteredItems = [];
            angular.forEach(
                items,
                function( item ) {
                    var index = selectedItems.indexOf( item );
                    if( index == -1 || index == currentIndex ) {
                        filteredItems.push( item );
                    }
                }
            );
            return filteredItems;
        };
    }
);
