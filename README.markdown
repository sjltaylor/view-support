		__     ___                ____                               _      _     
		\ \   / (_) _____      __/ ___| _   _ _ __  _ __   ___  _ __| |_   (_)___ 
		 \ \ / /| |/ _ \ \ /\ / /\___ \| | | | '_ \| '_ \ / _ \| '__| __|  | / __|
		  \ V / | |  __/\ V  V /  ___) | |_| | |_) | |_) | (_) | |  | |_ _ | \__ \
		   \_/  |_|\___| \_/\_/  |____/ \__,_| .__/| .__/ \___/|_|   \__(_)/ |___/
		                                     |_|   |_|                   |__/     
        

## Synopsis

View support provides some conventions, best practices and tools to make it easy to build view objects that have a consistent interface.

## Motivation

Great model frameworks such as JsModel make the M part of MVC easy and consistent. ViewSupport.js aims to do the same for views and is a thing layer over what browsers already provide. 


## Dependencies

* [Object.js](https://github.com/sjltaylor/object.js) for mixin functionality. You do not need to be familiar with this library to use view support
* [Eventify.js](https://github.com/sjltaylor/eventify) for event functionality. you should be familiar with eventify if you expect to use the events that view-support declares for views
* [jQuery](http://jquery.com). For DOM manipulation and DOM querying.

## Features

* Use ``VS.view(object, options)`` to provide views with
	* a standard way to access the view's root element
	* a standard way to destroy the view, unbinding all event listeners, helping to prevent memory leaks.
* Use ``VS.collection(object, options)`` to also provide a view with helpers for manage a collection of subviews

[``VS.view`` Usage]('docs/View.markdown')
[``VS.collection`` Usage]('docs/CollectionView.markdown')

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
















