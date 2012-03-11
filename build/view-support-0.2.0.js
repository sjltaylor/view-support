/*Copyright (C) 2012 by sjltaylor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicence, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/;(function ($) {
	$.fn.view = function () {
		return this.data().viewSupportView;
	}
})(jQuery);;VS = {};VS.collection = (function () {

	var collectionModule = {
		$: function () {
			return arguments.length ? this.__$__.find.apply(this.__$__, arguments) : this.__$__;
		}
	, add: function (subview) {
			var thyself = this;

			thyself.$().append(subview.$());
			
			subview.__parentCollection__ = thyself

			thyself.__subviews__[subview.__vsid__] = subview;

			thyself.view.onSubviewAdded().emit(subview);

			return thyself;
		}
	, clear: function () {
			object(this.__subviews__).each(function (subview) {
				subview.teardown();
			});	
		}
	, each: function (callback) {
			object(this.__subviews__).each(function (subview) {
				callback(subview);
			});
			return this;
		}
	, toArray: function () {
			var subviews = this.__subviews__;
			return Object.keys(subviews).map(function (key) { 
				return subviews[key] 
			});
		}
	, count: function () {
			return Object.keys(this.__subviews__).length;
		}
	, __removeSubview__: function (subview) {
			delete this.__subviews__[subview.__id__];
			this.view.onSubviewRemoved().emit(subview);
		}
	};

	return function (view, options) {
		options = options || {};

		VS.view(view, options);

		var container = options.$container || options.$; 
		
		container = (container instanceof HTMLElement) ? jQuery(container) : container;

		if (!(container instanceof jQuery)) {
			throw new Error('a jQuery or HTMLElement must be passed as $container');
		}

		var collection = {};
		view.collection = 'collection' in view ? view.collection : collection;
		collection.view = view;

		object(collection).mixin(collectionModule);
		
		collection.__$__ 				= container;
		collection.__subviews__ = {};

		eventify(view, function () {
			this.define('onSubviewAdded');
			this.define('onSubviewRemoved');
		});
	};
})();;VS.view = (function () {

	var idSpool = 0;

	var viewModule = {
		$: function () {
			return arguments.length ? this.__$__.find.apply(this.__$__, arguments) : this.__$__;
		}
	, detach: function () {
			
			this.$().detach();
			this.onDetached().emit();

			if (this.__parentCollection__) {
				this.__parentCollection__.__removeSubview__(this);
			}
		}
	, teardown: function () {
			
			if ('collection' in this) {
				this.collection.each(function (subview) {
					subview.teardown();
				});
			}

			this.$().remove();
			this.onTeardown().emit();

			if (this.__parentCollection__) {
				this.__parentCollection__.__removeSubview__(this);
			}

			this.eventify.cancelAllSubscriptions(this);
		}
	};

	return function (view, options) {
		options = options || {};

		var root = (options.$ instanceof HTMLElement) ? jQuery(options.$) : options.$;
		
		if (!(root instanceof jQuery)) {
			throw new Error('a jQuery or HTMLElement must be passed as $');
		}

		object(view).mixin(viewModule);
		view.__$__ 		= root;
		view.__vsid__ = ++idSpool;
		
		view.$().data('viewSupportView', view);

		eventify(view, function () {
			this.define('onTeardown');
			this.define('onDetached');
		});
	};
})();;