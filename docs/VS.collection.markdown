# VS.collection

Use this instead of ``VS.view`` when the view will contain a collection of other views, such as a list.

``VS.collection(object, options)`` mixes all of the functionality of ``VS.view(...)`` plus some additional functionality for managing a collection of subviews which must themselves mixin ``VS.view()``. Usage is similar to ``VS.view()``...

	function ThingsView () {
		
		VS.collection(this, {
			$: ...
		[, $container: ...]
		});

	}

	ThingsView.prototype = {...}	

## Options

As with ``VS.view()`` options must specify a root element as a jQuery or HTMLElement. With ``VS.collection()``, a ``$container`` may be specified so that the element containing subviews is not the same as the root.

## Mixin Functions

The collection view mixes in a ``VS.view``, adds a collection helper and defines extra events. The collection functions are mixed into a nested 'collection' member so that it is upto the developer to decide which, if any, of the collection api is available on the view object. It is expect that the views collection of subviews is managed internally.

Collection helper functions are mixed into a a ``collection`` member:

* ``collection.add(subview)``: a subview to add to the collection. The subview should have functions of a ``VS.view()``,
* ``collection.clear()``: calls ``remove()`` on all subviews.
* ``collection.each(callback)``: calls callback for each subview
* ``collection.toArray()``: returns an array of subviews
* ``collection.$()``: behaves just like ``$()`` from VS.view but instead acting on the container element

... and these events on the view...	

* ``onSubviewAdded(subview)``: when a subview is added to the collection
* ``onSubviewRemoved(subview)``: when a subview is destroyed or detached 

Example Usage...

		function MyListOfThings () {
			VS.collection(this, { $: $('#the_list'), $('#the_list ul') });
		}
		
		MyListOfThings.prototype = {
			update: function () {
				var self = this;
				
				self.collection.clear();
				
				self.model.forEach(function (thing) {
					
					var thingView = createAThingView(thing);
					self.collection.add(thingView);
				});
				
				...
			}
		, hideList: function () {
				this.collection.$().hide();
			}

### Subview behaviour

``destroy()`` or ``detach()`` called on the subview will remove it from the collection and cause the collection view to emit an onSubviewRemoved event.



