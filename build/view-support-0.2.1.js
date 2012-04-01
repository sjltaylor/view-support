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
		return this.data('viewSupport.view');
	}
})(jQuery);;function viewSupport (view, root) {
  
  var root = (root instanceof HTMLElement) ? jQuery(root) : root;
  
  if (!(root instanceof jQuery)) {
    throw new Error('a jQuery or HTMLElement must be passed as $');
  }

  object(view).mixin(viewSupport.view, root);

  return new viewSupport.Builder(view);
};;viewSupport.Builder = (function () {

  function Builder (view) {
    this.__view__ = view;
  }

  Builder.prototype = {
    collection: function (container) {

      if (typeof container === 'undefined') {
        
        container = this.__view__.$();

      } else if (container instanceof HTMLElement) {
        
        container = jQuery(container);
      
      } else if (typeof container === 'string') {

        container = this.__view__.$(container);

      } else if (!(container instanceof jQuery)) {
        
        throw new Error('the container must be a jQuery or HTMLElement');
      }

      object(this.__view__).mixin(viewSupport.collection, container);
      
      return this;
    }
  };

  return Builder;
})();;viewSupport.collection = (function () {

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
})();;viewSupport.view = (function () {

  var idSpool = 0;

  var view = {
    __mixin__: function (root) {
        
      eventify(this)
        .define('onDetached')
        .single('onTeardown');

      this.__$__    = root;
      this.__vsid__ = ++idSpool;

      this.$().data('viewSupport.view', this);
    }
  , $: function () {
      return arguments.length ? this.__$__.find.apply(this.__$__, arguments) : this.__$__;
    }
  , detach: function () {
      
      this.$().detach();

      this.onDetached.emit();

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
      this.onTeardown.emit();

      if (this.__parentCollection__) {
        this.__parentCollection__.__removeSubview__(this);
      }

      this.events.cancelAllSubscriptions(this);
    }
  };

  return view;
})();;