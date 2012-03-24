	__     ___                ____                               _   
	\ \   / (_) _____      __/ ___| _   _ _ __  _ __   ___  _ __| |_ 
	 \ \ / /| |/ _ \ \ /\ / /\___ \| | | | '_ \| '_ \ / _ \| '__| __|
	  \ V / | |  __/\ V  V /  ___) | |_| | |_) | |_) | (_) | |  | |_ 
	   \_/  |_|\___| \_/\_/  |____/ \__,_| .__/| .__/ \___/|_|   \__|
	                                     |_|   |_|                   
 

## Overview

ViewSupport provides some conventions and tools for javascript view objects. This library comprises:

1. `VS.view`: helper functions for a view object
2. `VS.collection`: additional helper functions for list/collection views
3. A jQuery plugin which returns the view object for a DOM element

### VS.view

    /*
      The view functions are mixed into an object, typically in a constructor
    */
    function MyView () {
      // all the mixin requires is a jQuery or HTMLElement root
      VS.view(this, { $: jQuery('#my_view') });
      ...
    }

MyView instances have helper functions and [eventify](https://github.com/sjltaylor/eventify) events:
    
    var view = new MyView;
    
    view.$()
    => the view's root DOM jQuery #my_view

    view.$('.something')
    => shorthand for view.$().find('.something')

    view.teardown()
    => removes the view from the DOM and unbinds event handlers helping to prevent memory leaks.
  
    view.onRemoved(function () {
      ...// do something!
    });
    
See [`VS.view documentation`](https://github.com/sjltaylor/view-support/wiki/VS.view) for a full listing


### VS.collection

    /*
      Similarly, collection functions are mixed into an object, also typically in a constructor
		*/
		function MyList () {
			
			// the collection mixin requires a jQuery or HTMLElement root
			// a container element can also be specified, see full docs
			VS.collection(this, { $: jQuery('#list1') });
			...
		}

Collection helper functions for managing a collection view:
	
		/*
			functions are mixed into a 'collection' member of the MyList instance to avoid naming collisions			 
		*/
		
		// add a view to the collection and the DOM
		this.collection.add(subview)
		
		// remove the view
		this.collection.remove(subview)
		
		// clear and remove all subviews
		this.collection.clear()
		
		// iterate subviees
		this.collection.each(function (subview) { ... })

See [`VS.collection documentation`](https://github.com/sjltaylor/view-support/wiki/VS.view) for full details

## Dependencies

* [Object.js](https://github.com/sjltaylor/object.js). Familiarity not required.
* [Eventify](https://github.com/sjltaylor/eventify). Familiarity required for event programming.
* [jQuery](http://jquery.com)

## Browser and Platform Support

Works in

* Chrome 17+
* Firefox 7+
* Safari 5.13+

Has not been tested in other browsers

## Acknowledgements

* [Figlet](http://www.figlet.org/) was used for the ASCII art
* I haven't tested it in many browsers

## Contributing

1. Install node
2. Install [cup](https://github.com/sjltaylor/cup) and read the docs
3. Write some code or docs
4. Make a pull request
5. Live happily ever after
