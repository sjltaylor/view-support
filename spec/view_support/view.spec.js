describe('viewSupport.view', function () {
	
	describe('the mixin options', function () {
		
		it('throws an error if no root is passed in the options', function () {
			
			expect(function () {
				viewSupport({});
			}).toThrow('a jQuery or HTMLElement must be passed as $');
		});

		it('throws an error if a root is passed but not a jQuery or HTMLElement', function () {
			expect(function () {
				viewSupport({}, 123);
			}).toThrow('a jQuery or HTMLElement must be passed as $');
		});

		it('accepts a HTMLElement as root', function () {
			var view = {};
			
			expect(function () {
				viewSupport(view, $('body')[0]);
			}).not.toThrow();
		});
	});

	describe('mixed in functionality', function () {
		var object, fragment;

		beforeEach(function () {
			
			object = {};
			fragment = $('<div>');

			viewSupport(object, fragment);
		});

		it('defines the teardown event as a single event', function () {
			expect(object.onTeardown.isSingle()).toBe(true);
		});

		describe('$()', function () {

			describe('calling without parameters', function () {

				var $el, object;

				beforeEach(function () {

					$('<ul>').appendTo('body');
					$el = $('<div>');
					$el.append($('<ul>').addClass('within'));

					object = {};

					viewSupport(object, $el);
				});

				it('returns a jquery representing the element', function () {
					
					expect(object.$()).toBe($el);
				});

				it('returns a jQuery representing the element if we passed a HTMLElement', function () {
					var view = {};
					viewSupport(view, document.createElement('div'));
					expect(view.$()).toBeInstanceOf(jQuery);
				});

				it('queries the withing the element if a jquery is passed', function () {
					var q = object.$('ul');
					expect(q.size()).toEqual(1);
					expect(q.hasClass('within')).toBe(true);
				});
			});
		});

		describe('detach()', function () {
			
			var view, $root, domEventHandler, viewEventHandler;

			beforeEach(function () {
				
				view 						 = {};
				$root 					 = $('<div>');
				domEventHandler  = jasmine.createSpy('dom event handler');
				viewEventHandler = jasmine.createSpy('view event handler');

				$root.bind('an-event', domEventHandler);

				viewSupport(view, $root);

				view.onDetached(viewEventHandler);
			});

			it('detaches the element from the dom preserving event listeners', function () {
				
				spyOn($root, 'detach');
				spyOn($root, 'remove');

				view.detach();

				expect($root.detach).toHaveBeenCalled();
				expect($root.remove).not.toHaveBeenCalled();

				expect(view.onDetached.subscriptions().count()).toBe(1);

				$root.trigger('an-event');

				expect(domEventHandler).toHaveBeenCalled();
			});

			it('emits an onDetached event', function () {
				view.detach();
				expect(viewEventHandler).toHaveBeenCalled();
			});
		});

		describe('teardown()', function () {
			
			var view, $root, domEventHandler, viewEventHandler;

			beforeEach(function () {
				
				view 						 = {};
				$root 					 = $('<div>').appendTo('body');
				domEventHandler  = jasmine.createSpy('dom event handler');
				viewEventHandler = jasmine.createSpy('view event handler');

				$root.bind('some-event', domEventHandler);

				viewSupport(view, $root );

				view.onTeardown(viewEventHandler);
			});

			it('results in the unbinding of DOM event handlers', function () {
				var $r = $('<div>').appendTo('body');
				var view = {};
				viewSupport(view, $r);
				var called = false;
				$r.bind('onevent', function () {
					called = true;
				});
				view.teardown();
				$r.trigger('onevent');
				expect(called).toBe(false);
			})

			it('removes the element from the dom ', function () {
				
				spyOn($root, 'detach');
				spyOn($root, 'remove');

				view.teardown();

				expect($root.detach).not.toHaveBeenCalled();
				expect($root.remove).toHaveBeenCalled();			
			});

			it('emits an onTeardown event', function () {
				view.teardown();
				expect(viewEventHandler).toHaveBeenCalled();
			});

			it('cancels all subscriptions to all events on the view', function () {
				
				eventify(view).define('onSomething');

				view.onSomething(function doSomething(){});

				view.teardown();
				
				expect(view.onDetached.subscriptions().count()).toBe(0);
				expect(view.onSomething.subscriptions().count()).toBe(0);
			});
		});
	});

});