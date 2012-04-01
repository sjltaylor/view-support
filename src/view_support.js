function viewSupport (view, root) {
  
  var root = (root instanceof HTMLElement) ? jQuery(root) : root;
  
  if (!(root instanceof jQuery)) {
    throw new Error('a jQuery or HTMLElement must be passed as $');
  }

  object(view).mixin(viewSupport.view, root);

  return new viewSupport.Builder(view);
};