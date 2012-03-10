describe('VS.view', function () {
	
	describe('the mixin options', function () {
		
		it('throws an error if no $ is passed in the options', function () {
			
			expect(function () {
				VS.view({});
			}).toThrow('a jQuery or HTMLElement must be passed as $');

			expect(function () {
				VS.view({}, {});
			}).toThrow('a jQuery or HTMLElement must be passed as $');
		});

		it('throws an error if a $ is passed but not a jQuery or HTMLElement', function () {
			expect(function () {
				VS.view({}, { $: {} });
			}).toThrow('a jQuery or HTMLElement must be passed as $');
		});

		it('accepts a HTMLElement as $', function () {
			expect(function () {
				VS.view({}, { $: $('body')[0] });
			}).not.toThrow();
		});
	});

	describe('mixed in functionality', function () {
		var object, fragment;

		beforeEach(function () {
			
			object = {};
			fragment = $('<div>');

			VS.view(object, {
				$: fragment
			});
		});

		describe('id()', function () {
			
			it('returns a permanent unique id', function () {
				
				var anotherObject = {};
				VS.view(anotherObject, {$: $('<div>')});

				expect(object.id()).toBe(1);
				expect(object.id()).toBe(1);
				
				expect(anotherObject.id()).toBe(2);
			});
		});

		describe('$()', function () {

			describe('calling without parameters', function () {

				var $el, object;

				beforeEach(function () {

					$('<ul>').appendTo('body');
					$el = $('<div>');
					$el.append($('<ul>').addClass('within'));

					object = {};

					VS.view(object, {
						$: $el
					});
				});

				it('returns a jquery representing the element', function () {
					
					expect(object.$()).toBe($el);
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

				VS.view(view, { $: $root });

				view.onDetached(viewEventHandler);
			});

			it('detaches the element from the dom preserving event listeners', function () {
				
				spyOn($root, 'detach');
				spyOn($root, 'remove');

				view.detach();

				expect($root.detach).toHaveBeenCalled();
				expect($root.remove).not.toHaveBeenCalled();

				expect(view.onDetached().subscriptions().count()).toBe(1);

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

				VS.view(view, { $: $root });

				view.onTeardown(viewEventHandler);
			});

			it('results in the unbinding of DOM event handlers', function () {
				var $r = $('<div>').appendTo('body');
				var view = {};
				VS.view(view, { $: $r });
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
				
				eventify(view, function () {
					this.define('onSomething');
				});

				view.onSomething(function doSomething(){});

				view.teardown();
				
				expect(view.onDetached().subscriptions().count()).toBe(0);
				expect(view.onSomething().subscriptions().count()).toBe(0);
			});
		});
	});

});