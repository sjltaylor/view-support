VS.collection = (function () {

	var idSpool = 0;

	var collectionModule = {
		$: function () {
			return arguments.length ? this.__$__.find.apply(this.__$__, arguments) : this.__$__;
		}
	, add: function (subview) {
			var thyself = this;

			thyself.$().append(subview.$());
			
			subview.__parentCollection__ = thyself

			thyself.__subviews__[subview.id()] = subview;

			thyself.view.onSubviewAdded().emit(subview);

			return thyself;
		}
	, get: function (id) {
			return this.__subviews__[id];
		}
	, clear: function () {
			object(this.__subviews__).each(function (subview) {
				subview.teardown();
			});	
		}
	, each: function (callback) {
			object(this.__subviews__).each(callback);
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
			delete this.__subviews__[subview.id()];
			this.view.onSubviewRemoved().emit(subview);
		}
	};

	return function (view, options) {
		options = options || {};

		VS.view(view, options);

		if (options.$container && !((options.$container instanceof jQuery) || (options.$container instanceof HTMLElement))) {
			throw new Error('a jQuery or HTMLElement must be passed as $container');
		}

		var collection = {};
		view.collection = collection;
		collection.view = view;

		object(collection).mixin(collectionModule);
		
		view.__$__ 				 			= options.$;
		collection.__$__ 				= options.$container || options.$;
		collection.__subviews__ = {};

		eventify(view, function () {
			this.define('onSubviewAdded');
			this.define('onSubviewRemoved');
		});
	};
})();