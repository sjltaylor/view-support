viewSupport.Builder = (function () {

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
})();