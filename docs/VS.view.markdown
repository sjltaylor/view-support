# VS.view

This document describes support for Views

Usage: ``VS.view(object, options)``

To be used, most likely, in a constructor...

		function ThingView () {
			
			VS.view(this, {
				$: ... 
			});

			...
		}

		ThingView.prototype = {
			...
		}

## Options

Options must include ``$``. ``$`` can be a jQuery or an HTMLElement representing the root element for the view.

## Mixin Functions

The view following functions are mixed into the view:

* ``$([css-query])``
* ``detach()``
* ``teardown()``

... and some events are defined ...

* ``onDetached()`` 
* ``onTeardown()`` 

If the object already has any of the previously described members, they will not be replaced.

### $()

This function can be called without arguments to get ajQuery representing the views root element: ``view.$()`` or with arguments to jQuery within the view ``view.$('.my-css-class')`` (which is simply a shortcut for ``view.$().find('.my-css-class')``)


### detach()

1. Detaches the element from the DOM, preserving DOM event listeners
2. If the subview is a member of a collection, it is removed
3. Emits an onDetached event

### teardown()

1. Removes the element from the DOM unbinding DOM event listeners
2. If the subview is a member of a collection, it is removed
3. If the view is itself a collection all of it's subviews are destroye#
4. Emits an onRemoved event 
5. Cancels all subscriptions to all eventify events on the view object

