VS.collection = (function () {

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

		view.collection = 'collection' in view ? view.collection : {};
		view.collection.view = 'view' in view.collection ? view.collection.view : view;

		object(view.collection).mixin(collectionModule);
		
		view.collection.__$__ 				= container;
		view.collection.__subviews__ = {};

		eventify(view, function () {
			this.define('onSubviewAdded');
			this.define('onSubviewRemoved');
		});
	};
})();