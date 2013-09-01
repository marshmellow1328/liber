(function($) {
	var init_queue = $.Deferred(); // jQuery deferred object used for creating TinyMCE instances synchronously
	init_queue.resolve();
	ko.bindingHandlers.tinymce = {
	    init: function (element, valueAccessor, allBindingsAccessor, context) {
	        var options = allBindingsAccessor().tinymceOptions || {
						menubar : false,
						statusbar : false,
						paste_as_text: true,
						toolbar: "bold italic hr | link unlink | bullist numlist | fullscreen",
						plugins: "link,paste,fullscreen"
					};
	        var modelValue = valueAccessor();
	        var value      = ko.utils.unwrapObservable(valueAccessor());
	        var el         = $(element);
	        
	        if( !element.id ) {
	        	element.id = tinyMCE.DOM.uniqueId();
	        }
	
	        //handle edits made in the editor. Updates after an undo point is reached.
	        options.setup = function (ed) {
				ed.on('change', function(e) {
					if (ko.isWriteableObservable(modelValue)) {
						modelValue(ed.getContent());
					}
				});
				ed.on('keyup', function(e) {
					if (ko.isWriteableObservable(modelValue)) {
						modelValue(ed.getContent({format: 'raw'}));
					}
				});
	        };
	
	        //handle destroying an editor 
			ko.utils.domNodeDisposal.addDisposeCallback(
				element, 
				function () {
					setTimeout(
						function() {
							$( element ).tinymce().remove();
						}, 
						0 
					);
				} 
			);
	
	        setTimeout( 
	        	function() { 
	        		$( element ).tinymce( options ); 
	        	}, 
	        	0 
	        );
	        el.html( value );
	    },
	    update: function (element, valueAccessor, allBindingsAccessor, context) {
	        var el = $(element);
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        var id = el.attr('id');
	        
	        //handle programmatic updates to the observable
	        // also makes sure it doesn't update it if it's the same. 
	        // otherwise, it will reload the instance, causing the cursor to jump.
	        if( id !== undefined ) {
	        	var tinyMceElement = tinyMCE.get( id );
	        	if( tinyMceElement ) {
		        	var content = tinyMceElement.getContent( { format: 'raw' } );
		            if( content !== value ) {
		                el.html(value);
		            }
	        	}
	        }
	    }
	};
}(jQuery));