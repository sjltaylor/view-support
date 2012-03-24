	__     ___                ____                               _   
	\ \   / (_) _____      __/ ___| _   _ _ __  _ __   ___  _ __| |_ 
	 \ \ / /| |/ _ \ \ /\ / /\___ \| | | | '_ \| '_ \ / _ \| '__| __|
	  \ V / | |  __/\ V  V /  ___) | |_| | |_) | |_) | (_) | |  | |_ 
	   \_/  |_|\___| \_/\_/  |____/ \__,_| .__/| .__/ \___/|_|   \__|
	                                     |_|   |_|                   
 

## Synopsis

ViewSupport provides some conventions and tools for javascript view objects.

## Features

### VS.view

Helpers for views:

    view.$()
    => the view's root DOM jQuery

    view.$('.something')
    => shorthand for view.$().find('.something')

    view.teardown()
    => removes the view from the DOM and unbinds event handlers helping to prevent memory leaks.

VS.view also defines other functions/events...


### VS.collection

Collection helpers for managing a view which is a collection of subviews:

		// add a view to the collection and the DOM
		view.collection.add(subview)
		
		// remove the view
		view.collection.remove(subview)
		
		// clear and remove all subviews
		view.collection.clear()
		
		// iterate subviees
		view.collection.each(function (subview) { ... })
	

## Documentation

Full Documentation is [available on the wiki](https://github.com/sjltaylor/view-support/wiki)

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
















