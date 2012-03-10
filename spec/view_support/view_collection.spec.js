describe('VS.collection', function () {

	describe('the mixin options', function () {
		
		it('allows the specification of a $container separate from the $ root element', function () {
			
			var collectionView = {};
			var container = $('<div>');

			VS.collection(collectionView, { $: $('<div>'), $container: container });

			expect(collectionView.collection.$()).toBe(container);
		});

		it('defaults $container to the $ root element', function () {
			
			var collectionView = {};
			var root = $('<div>');

			VS.collection(collectionView, { $: root });

			expect(collectionView.collection.$()).toBe(root);
		});

		it('throws an error if a $container is passed but not a jQuery or HTMLElement', function () {
			expect(function () {
				VS.collection({}, { $: $('<div>'), $container: {} });
			}).toThrow('a jQuery or HTMLElement must be passed as $container');
		});

		it('accepts a HTMLElement as $container', function () {
			expect(function () {
				VS.view({}, { $: $('body')[0] });
			}).not.toThrow();
		});
	});

	describe('#add(subview)', function () {

		var view1, view2, view3, view4, collectionView;

		beforeEach(function () {
			
			view1 = {};
			VS.view(view1, {$: $('<div>').addClass('view1')});

			view2 = {};
			VS.view(view2, {$: $('<div>').addClass('view2')});

			view3 = {};
			VS.view(view3, {$: $('<div>').addClass('view3')});

			view4 = {};
			VS.view(view4, {$: $('<div>').addClass('view4')});

			collectionView = {};
			VS.collection(collectionView, {
				$: $('<div>').addClass('spec-vs-collection').appendTo('body'), 
				$container: $('<div>')
			});
		});

		it('appends the subview to the $container element', function () {
				
			collectionView.collection.add(view1);
			collectionView.collection.add(view2);	

			expect(collectionView.collection.$().children().first().hasClass('view1')).toBe(true);
			expect(collectionView.collection.$().children().last().hasClass('view2')).toBe(true);
		});

		it('returns the collection', function () {
			expect(collectionView.collection.add(view1)).toBe(collectionView.collection);
		});

		it('emits an onSubviewAdded event', function () {
			
			var listener = jasmine.createSpy('listener');
			collectionView.onSubviewAdded(listener);

			collectionView.collection.add(view1);

			expect(listener).toHaveBeenCalledWith(view1);
		});
	});

	describe('#clear()', function () {
		
		var view1, view2, collectionView;

		beforeEach(function () {
			
			view1 = {
				id: function () {
					return 1;
				}
			};

			VS.view(view1, {$: $('<div>').addClass('view1')});

			view2 = {
				id: function () {
					return 2;
				}
			};

			VS.view(view2, {$: $('<div>').addClass('view2')});

			collectionView = {};
			VS.collection(collectionView, {
				$: $('<div>').addClass('spec-vs-collection').appendTo('body'), 
				$container: $('<div>')
			});

			collectionView.collection.add(view1);
			collectionView.collection.add(view2);
		});

		it('calls teardown on every subview', function () {
			
			spyOn(view1, 'teardown');
			spyOn(view2, 'teardown');

			collectionView.collection.clear();

			expect(view1.teardown).toHaveBeenCalled();
			expect(view2.teardown).toHaveBeenCalled();
		});

		it('returns undefined', function () {
			expect(collectionView.collection.clear()).toBeUndefined();
		})
	});

	describe('#teardown()', function () {

		var collectionView, subview1, subview2;

		beforeEach(function () {
			
			collectionView = {};
			subview1 = {};
			subview2 = {};

			VS.collection(collectionView, {
				$: $('<div>')
			});

			VS.view(subview1, {
				$: $('<div>')
			});

			VS.view(subview2, {
				$: $('<div>')
			});

			collectionView.collection.add(subview1).add(subview2);
		});

		it('tears down each of its subviews', function () {
			spyOn(subview1, 'teardown');
			spyOn(subview2, 'teardown');

			collectionView.teardown();

			expect(subview1.teardown).toHaveBeenCalled();
			expect(subview2.teardown).toHaveBeenCalled();
		})
	});

	describe('#each()', function () {
		var view1, view2, collectionView;

		beforeEach(function () {
			
			view1 = {};
			VS.view(view1, {$: $('<div>').addClass('view1')});

			view2 = {};
			VS.view(view2, {$: $('<div>').addClass('view2')});

			collectionView = {};
			VS.collection(collectionView, {
				$: $('<div>').addClass('spec-vs-collection').appendTo('body'), 
				$container: $('<div>')
			});
		});

		it('iterates of the subviews in the collection', function () {
			var vs = [];
			collectionView.collection.add(view1).add(view2);
			collectionView.collection.each(function (subview) {
				vs.push(subview);
			});
			expect(vs).toEqual([view1, view2]);
		});

		it('returns the collectionView.collection', function () {
			expect(collectionView.collection.each(function(){})).toBe(collectionView.collection);
		});
	});

	describe('#toArray()', function () {
		var view1, view2, collectionView;

		beforeEach(function () {
			
			view1 = {};
			VS.view(view1, {$: $('<div>').addClass('view1')});

			view2 = {};
			VS.view(view2, {$: $('<div>').addClass('view2')});

			collectionView = {};
			VS.collection(collectionView, {
				$: $('<div>').addClass('spec-vs-collection').appendTo('body'), 
				$container: $('<div>')
			});
		});

		it('returns an array of all subviews', function () {
			collectionView.collection.add(view1).add(view2);
			expect(collectionView.collection.toArray()).toEqual([view1, view2]);
		});
	});

	describe('#count()', function () {
		var view1, view2, collectionView;

		beforeEach(function () {
			
			view1 = {};
			VS.view(view1, {$: $('<div>').addClass('view1')});

			view2 = {};
			VS.view(view2, {$: $('<div>').addClass('view2')});

			collectionView = {};
			VS.collection(collectionView, {
				$: $('<div>').addClass('spec-vs-collection').appendTo('body'), 
				$container: $('<div>')
			});
		});

		it('returns the number of subviews', function () {
			collectionView.collection.add(view1).add(view2);
			expect(collectionView.collection.count()).toBe(2);
		});
	});

	describe('a subview being detached', function () {

		var view1, view2, collectionView;

		beforeEach(function () {
			
			view1 = {
				id: function () {
					return 1;
				}
			};

			VS.view(view1, {$: $('<div>').addClass('view1')});

			view2 = {
				id: function () {
					return 2;
				}
			};

			VS.view(view2, {$: $('<div>').addClass('view2')});

			collectionView = {};
			
			VS.collection(collectionView, {
				$: $('<div>').addClass('spec-vs-collection').appendTo('body'), 
				$container: $('<div>')
			});

			collectionView.collection.add(view1);
			collectionView.collection.add(view2);
		});
		
		it('the collection emits an onSubviewRemoved event', function () {
			collectionView.collection.add(view1);

			var listener = jasmine.createSpy('onSubviewDetached listener');
			collectionView.onSubviewRemoved(listener);

			view1.detach();

			expect(listener).toHaveBeenCalledWith(view1);
		});

		it('removes the subview from the collection', function () {
			collectionView.collection.add(view1);
			view1.detach();
			expect(collectionView.collection.__subviews__[view1.__id__]).toBeUndefined();
		});
	});

	describe('a subview being torn down', function () {

		var view1, view2, collectionView;

		beforeEach(function () {
			
			view1 = {
				id: function () {
					return 1;
				}
			};

			VS.view(view1, {$: $('<div>').addClass('view1')});

			view2 = {
				id: function () {
					return 2;
				}
			};

			VS.view(view2, {$: $('<div>').addClass('view2')});

			collectionView = {};
			VS.collection(collectionView, {
				$: $('<div>').addClass('spec-vs-collection').appendTo('body'), 
				$container: $('<div>')
			});

			collectionView.collection.add(view1);
			collectionView.collection.add(view2);
		});
		
		it('the collection emits an onSubviewRemoved event', function () {
			collectionView.collection.add(view1);

			var listener = jasmine.createSpy('onSubviewDetached listener');
			collectionView.onSubviewRemoved(listener);

			view1.teardown();

			expect(listener).toHaveBeenCalledWith(view1);
		});

		it('removes the subview from the collection', function () {
			collectionView.collection.add(view1);
			view1.teardown();
			expect(collectionView.collection.__subviews__[view1.__id__]).toBeUndefined();
		});
	});
});	