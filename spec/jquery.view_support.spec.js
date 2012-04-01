describe('jquery.view_support', function () {

	describe('when the jQuery represents the root of a view', function () {

		var view;

		beforeEach(function () {
			view = {};
			viewSupport(view, $('<div id="view_root1">').appendTo('body'));
		});
		
		it('jQuery.view() returns the view corresponding to the root element', function () {
			expect($('#view_root1').view()).toBe(view);
		});
	});

	describe('when the jQuery does not represent an views root element', function () {

		beforeEach(function () {
			$('<div id="a_root_element">').appendTo('body');
		});

		it('returns undefined', function () {
			expect($('#a_root_element').view()).toBeUndefined();
		});
	});
});