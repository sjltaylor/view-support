describe('viewSupport.collection', function () {

	describe('the mixin', function () {
		
		it('allows the specification of a $container separate from the $ root element', function () {
			
			var view = {};
			var container = $('<div>');

			viewSupport(view, $('<div>')).collection(container);

			expect(view.collection.$()).toBe(container);
		});

		it('defaults the collection container to the root element', function () {
			
			var view = {};
			var root = $('<div>');

			viewSupport(view, root ).collection();

			expect(view.collection.$()).toBe(root);
		});

		it('throws an error if a container is passed but is not a jQuery or HTMLElement or String', function () {
			expect(function () {
				viewSupport({}, $('<div>')).collection({});
			}).toThrow('the container must be a jQuery or HTMLElement');
		});

		it('jQueries to view root if a string is passed', function () {
			
			var root = $('<div>').append($('<div>').addClass('container1'));
			var view = {};
			
			viewSupport(view, root).collection('.container1');

			expect(view.collection.$().hasClass('container1')).toBe(true);
		});

		it('accepts a HTMLElement as a container', function () {
			expect(function () {
				viewSupport({}, $('body')[0]).collection($('<div>')[0]);
			}).not.toThrow();
		});

		it('throws an error if there is already a collections member', function () {
			var collection = {}, view = { collection: collection };

			expect(function () {
				viewSupport(view, document.createElement('div')).collection();				
			}).toThrow('view already has a "collection" member');
		});
	});

	describe('#add(subview)', function () {

		var view1, view2, view3, view4, view;

		beforeEach(function () {
			
			view1 = {};
			viewSupport(view1, $('<div>').addClass('view1'));

			view2 = {};
			viewSupport(view2, $('<div>').addClass('view2'));

			view3 = {};
			viewSupport(view3, $('<div>').addClass('view3'));

			view4 = {};
			viewSupport(view4, $('<div>').addClass('view4'));

			view = {};

			var root = $('<div>').addClass('spec-vs-collection').appendTo('body');

			viewSupport(view, root).collection($('<div>'));
		});

		it('appends the subview to the $container element', function () {
				
			view.collection.add(view1);
			view.collection.add(view2);	

			expect(view.collection.$().children().first().hasClass('view1')).toBe(true);
			expect(view.collection.$().children().last().hasClass('view2')).toBe(true);
		});

		it('returns the collection', function () {
			expect(view.collection.add(view1)).toBe(view.collection);
		});

		it('emits an onSubviewAdded event', function () {
			
			var listener = jasmine.createSpy('listener');
			view.onSubviewAdded(listener);

			view.collection.add(view1);

			expect(listener).toHaveBeenCalledWith(view1);
		});
	});

	describe('#clear()', function () {
		
		var view1, view2, view;

		beforeEach(function () {
			
			view1 = {
				id: function () {
					return 1;
				}
			};

			viewSupport(view1, $('<div>').addClass('view1'));

			view2 = {
				id: function () {
					return 2;
				}
			};

			viewSupport(view2, $('<div>').addClass('view2'));

			view = {};
			viewSupport(view, $('<div>').addClass('spec-vs-collection').appendTo('body')).collection();

			view.collection.add(view1);
			view.collection.add(view2);
		});

		it('calls teardown on every subview', function () {
			
			spyOn(view1, 'teardown');
			spyOn(view2, 'teardown');

			view.collection.clear();

			expect(view1.teardown).toHaveBeenCalled();
			expect(view2.teardown).toHaveBeenCalled();
		});

		it('returns undefined', function () {
			expect(view.collection.clear()).toBeUndefined();
		})
	});

	describe('#teardown()', function () {

		var view, subview1, subview2;

		beforeEach(function () {
			
			view = {};
			subview1 = {};
			subview2 = {};

			viewSupport(view, $('<div>')).collection();

			viewSupport(subview1, $('<div>'));
			viewSupport(subview2, $('<div>'));

			view.collection.add(subview1).add(subview2);
		});

		it('tears down each of its subviews', function () {
			spyOn(subview1, 'teardown');
			spyOn(subview2, 'teardown');

			view.teardown();

			expect(subview1.teardown).toHaveBeenCalled();
			expect(subview2.teardown).toHaveBeenCalled();
		})
	});

	describe('#each()', function () {
		var view1, view2, view;

		beforeEach(function () {
			
			view1 = {};
			viewSupport(view1, $('<div>').addClass('view1'));

			view2 = {};
			viewSupport(view2, $('<div>').addClass('view2'));

			view = {};
			var root = $('<div>').addClass('spec-vs-collection').appendTo('body');
			viewSupport(view, root).collection($('<div>'));
		});

		it('iterates of the subviews in the collection', function () {
			var vs = [];
			view.collection.add(view1).add(view2);
			view.collection.each(function (subview) {
				vs.push(subview);
			});
			expect(vs).toEqual([view1, view2]);
		});

		it('returns the view.collection', function () {
			expect(view.collection.each(function(){})).toBe(view.collection);
		});
	});

	describe('#toArray()', function () {
		var view1, view2, view;

		beforeEach(function () {
			
			view1 = {};
			viewSupport(view1, $('<div>').addClass('view1'));

			view2 = {};
			viewSupport(view2, $('<div>').addClass('view2'));

			view = {};
			viewSupport(view, $('<div>').addClass('spec-vs-collection').appendTo('body'))
				.collection($('<div>'));
		});

		it('returns an array of all subviews', function () {
			view.collection.add(view1).add(view2);
			expect(view.collection.toArray()).toEqual([view1, view2]);
		});
	});

	describe('#count()', function () {
		var view1, view2, view;

		beforeEach(function () {
			
			view1 = {};
			viewSupport(view1, $('<div>').addClass('view1'));

			view2 = {};
			viewSupport(view2, $('<div>').addClass('view2'));

			view = {};
			viewSupport(view, $('<div>').addClass('spec-vs-collection').appendTo('body'))
				.collection($('<div>'));
		});

		it('returns the number of subviews', function () {
			view.collection.add(view1).add(view2);
			expect(view.collection.count()).toBe(2);
		});
	});

	describe('a subview being detached', function () {

		var view1, view2, view;

		beforeEach(function () {
			
			view1 = {
				id: function () {
					return 1;
				}
			};

			viewSupport(view1, $('<div>').addClass('view1'));

			view2 = {
				id: function () {
					return 2;
				}
			};

			viewSupport(view2, $('<div>').addClass('view2'));

			view = {};
			
			viewSupport(view, $('<div>').addClass('spec-vs-collection').appendTo('body'))
				.collection($('<div>'));

			view.collection.add(view1);
			view.collection.add(view2);
		});
		
		it('the collection emits an onSubviewRemoved event', function () {
			view.collection.add(view1);

			var listener = jasmine.createSpy('onSubviewDetached listener');
			view.onSubviewRemoved(listener);

			view1.detach();

			expect(listener).toHaveBeenCalledWith(view1);
		});

		it('removes the subview from the collection', function () {
			view.collection.add(view1);
			view1.detach();
			expect(view.collection.__subviews__[view1.__id__]).toBeUndefined();
		});
	});

	describe('a subview being torn down', function () {

		var view1, view2, view;

		beforeEach(function () {
			
			view1 = {
				id: function () {
					return 1;
				}
			};

			viewSupport(view1, $('<div>').addClass('view1'));

			view2 = {
				id: function () {
					return 2;
				}
			};

			viewSupport(view2, $('<div>').addClass('view2'));

			var root = $('<div>').addClass('spec-vs-collection').appendTo('body')
			view = {};

			viewSupport(view, root).collection($('<div>'));

			view.collection.add(view1);
			view.collection.add(view2);
		});
		
		it('the collection emits an onSubviewRemoved event', function () {
			view.collection.add(view1);

			var listener = jasmine.createSpy('onSubviewDetached listener');
			view.onSubviewRemoved(listener);

			view1.teardown();

			expect(listener).toHaveBeenCalledWith(view1);
		});

		it('removes the subview from the collection', function () {
			view.collection.add(view1);
			view1.teardown();
			expect(view.collection.__subviews__[view1.__id__]).toBeUndefined();
		});
	});
});	