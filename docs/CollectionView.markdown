# Collection Views

This document describes additional support for Views which contain a collection of other Views such as a list.

``VS.collection(object, options)`` mixes all of the functionality of ``VS.view(...)`` plus some additional functionality for managing a collection of subviews. Usage is similar to ``VS.view()``...

	function ThingsView () {
		
		VS.collection(this, {
			$: ...
		[, $container: ...]
		});

	}

	ThingsView.prototype = {...}	

## About ``options``

As with ``VS.view()`` options **must** specify a root container element as a jQuery or HTMLElement. With ``VS.collection()``, a ``$container`` may also be specified. The ``$container`` can be a string, jQuery or a HTMLElement and represents the DOM element that will contain collection entries. This can be used in cases where the views root is __not__ the container for collection entries.

The specified ``$container`` is stored object object as the ``$container`` property unless instead of passing``$container`` as an option, you define a function called ``$container`` on its prototype ...

		function ThingsView () {
			VS.collection(this, {
				$: ...
			});
		}

		ThingsView.prototype = {
			$container: function () {
				return // a jQuery represdenting the collection element;
			}
		}

... or assign it as a member in the constructor ...

		function ThingsView () {
			
			VS.collection(this, {
				$: ...
			});

			// using the view-support $() member
			this.$container = this.$('ul.list');
		}

... in either of these cases a ``$container`` given in the options will be ignored.


## ``VS.collection()`` Mixin

After ``VC.collection()`` is called with an object the object will have all of the functions and events of a ``VS.view()`` as well as these functions...

* ``add(subview[, position])``: a subview to add to the collection with an optional insertion index. Adding by position is useful when using a collection view for a sorted model collection.
* ``get(id)``: returns the subview corresponding to the given id.
* ``clear()``: calls ``teardown()`` on all subviews.

... and these events ...	

* onSubviewAdded(subview, position)
* onSubviewDetached(subview, position)
* onSubviewTeardown(subview, position)

When a subview is added to a collection, two functions are mixed into the subview (unless they already exist) ...

* ``collection()``: returns the collection to which the subview was added
* ``removeFromCollection()``: removes the subview from the collection and removes the added methods and events.

..and two events are defined on the added subview...

* ``onAdded(position)``
* ``onDetached(position)``


### Defining a useful ``id()`` function on subviews

The ``VS.view()`` mixin includes an ``id()`` function. Each id is generated at runtime on the client. While this is convenient there are many times when it would be better for a view's ``id()`` to correspond to an database record identifier for the model that the view represents. This would allow the view and its collection to be used in the following way from the console...


// some time earlier on the views were constructed...


app = {
	...
,	thingsView: new ThingsView
, ...
};

// Let's say the ThingsView prototype has a a function to show a thing...

ThingsView.prototype = {
	showThing: function (id) {
		var thingView = this.get(id);
		// hide all of the others somehow...
		this.hideAllThingsExcept(thingView);
		thingView.highlight();
		// etc...
	}
}

// Each ThingView within the ThingsView implement an id function that
// corresponds to their model's database record id.
// Then, when an onpopstate event occured and the new url is '/things/124'
// a handler can do this...

function someKindOfRouteHandler (parsedThingId) {
	app.thingsView.showThing(parsedThingId);
}

