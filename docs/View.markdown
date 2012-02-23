# Views

This document describes support for Views


``VS.view(object, options)`` mixes functionality into object and should in view classes like this...

		function ThingView () {
			
			VS.view(this, {
				$: ... 
			});

			...
		}

		ThingView.prototype = {
			...
		}

## About ``options``

Options **must** include a ``$`` member which can be a jQuery or an HTMLElement representing the root element for the view.

## ``VS.view()`` Mixin

After ``VS.view()`` is called with an object the object will gain the following functions:

* ``id()``
* ``$([css-query])``
* ``detach()``
* ``teardown()``

... and an eventify-defined event:

* ``onTeardown(position)``. ``position`` is the index of the subview within its collection

**Note:** If the object already has any of the previously described members, they will not be replaced.


### ``id()``

A unique generated identifier for the subview of the form 'VS-id-n' where n is a number. This is used to identify the view within a collection. See the CollectionView readme for more on how this can be used.


### ``$()``

This function can be called without arguments to get ajQuery representing the views root element: ``view.$()`` or with arguments to jQuery within the view ``view.$('.my-css-class')`` (which is simply a shortcut for ``view.$().find('.my-css-class')``)


### ``detach()``

1. Detaches the element from the DOM, preserving DOM event listeners
2. Emits an onDetached event

### ``teardown()``

1. Removes the element from the DOM unbinding DOM event listeners
2. Emits an onTeardown event 
3. Cancels all subscriptions to all eventify events on the view object

