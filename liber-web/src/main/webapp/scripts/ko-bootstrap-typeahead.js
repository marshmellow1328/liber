/*
 * Most of this code was taken from the URLs below. The updater function was written by me to work
 * both with observables and simple values.
 * 
 * http://stackoverflow.com/questions/17565416/twitter-bootstrap-typeahead-selection-not-bound-by-knockoutjs
 * http://jsfiddle.net/4xAPD/
 */
ko.bindingHandlers.typeahead = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element);
        var allBindings = allBindingsAccessor();
        var typeaheadArr = ko.utils.unwrapObservable(valueAccessor());
        
        $element.attr("autocomplete", "off")
				.typeahead({
				    'source': typeaheadArr,
				    'minLength': allBindings.minLength,
				    'items': allBindings.items,
                    'updater': function(item) {
                        var value = ko.unwrap( allBindings.value );
                        value = item;
                        return item;
                    }
				});
    }
};
