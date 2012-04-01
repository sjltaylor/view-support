viewSupport.collection = (function () {

	var collection = {
    __mixin__: function (view, container) {
      this.view 				= view;
      this.__$__        = container;
      this.__subviews__ = {};
    }
  , $: function () {
      return arguments.length ? this.__$__.find.apply(this.__$__, arguments) : this.__$__;
    }
  , add: function (subview) {
      var thyself = this;

      thyself.$().append(subview.$());
      
      subview.__parentCollection__ = thyself

      thyself.__subviews__[subview.__vsid__] = subview;

      thyself.view.onSubviewAdded.emit(subview);

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
      this.view.onSubviewRemoved.emit(subview);
    }
  };

	var mixin = {
		__mixin__: function (container) {

      if ('collection' in this) {
        throw new Error('view already has a "collection" member');
      }

      this.collection = {};

      eventify(this).define('onSubviewAdded', 'onSubviewRemoved');

      object(this.collection).mixin(collection, this, container);
		}
	}  

  return mixin;
})();