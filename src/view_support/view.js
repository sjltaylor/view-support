VS.view = (function () {

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

		if (!((options.$ instanceof jQuery) || (options.$ instanceof HTMLElement))) {
			throw new Error('a jQuery or HTMLElement must be passed as $');
		}

		object(view).mixin(viewModule);
		view.__$__ 		= options.$;
		view.__vsid__ = ++idSpool;
		 
		eventify(view, function () {
			this.define('onTeardown');
			this.define('onDetached');
		});
	};
})();