viewSupport.view = (function () {

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
})();