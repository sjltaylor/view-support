                                                                                                                                                  
		8b           d8 88                                ad88888ba                                                                         88            
		`8b         d8' ""                               d8"     "8b                                                              ,d        ""            
		 `8b       d8'                                   Y8,                                                                      88                      
		  `8b     d8'   88  ,adPPYba, 8b      db      d8 `Y8aaaaa,   88       88 8b,dPPYba,  8b,dPPYba,   ,adPPYba,  8b,dPPYba, MM88MMM     88 ,adPPYba,  
		   `8b   d8'    88 a8P_____88 `8b    d88b    d8'   `"""""8b, 88       88 88P'    "8a 88P'    "8a a8"     "8a 88P'   "Y8   88        88 I8[    ""  
		    `8b d8'     88 8PP"""""""  `8b  d8'`8b  d8'          `8b 88       88 88       d8 88       d8 8b       d8 88           88        88  `"Y8ba,   
		     `888'      88 "8b,   ,aa   `8bd8'  `8bd8'   Y8a     a8P "8a,   ,a88 88b,   ,a8" 88b,   ,a8" "8a,   ,a8" 88           88,   888 88 aa    ]8I  
		      `8'       88  `"Ybbd8"'     YP      YP      "Y88888P"   `"YbbdP'Y8 88`YbbdP"'  88`YbbdP"'   `"YbbdP"'  88           "Y888 888 88 `"YbbdP"'  
		                                                                         88          88                                            ,88            
		                                                                         88          88                                          888P"            

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
















