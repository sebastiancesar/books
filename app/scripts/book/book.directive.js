(function () {
	'use strict';

 	// Added some images covers in the images/ path, to provide a more realistic view.

	var MAX_IMAGES_NUMBER = 140; // There are 140 images downloaded from internet.

	var productsController = function productsController ($state) {
		var controller = this;
		
		controller.bookDetail = bookDetail;

		function bookDetail (book) {
			// Go to the detail page/state with the book as parameter. In this way, the
			// url only shows .../#/detail , there is no information about the book nor the title ,or book.id
			// In a real environment probably would be nice to have more seo friendly urls.
			$state.go('layout.bookDetail', { book: book });
		}

		function formatBook () {
			controller.item.publishedFormatted = moment(controller.item.published).fromNow();
			controller.item.imgSrc = 'images/covers/' + _.random(1, MAX_IMAGES_NUMBER) + '.jpg'; 
		}

		formatBook();
	};

	// The book directive is where is encapsulated the view and some logic of the book object.
	// It's has a template and a controller. The controller is thin, without much logic, only formating things
	// This directive can be reused across the app, for example is the same directive in the 
	// main grid and in the recommended section
	var bookDirective = function bookDirective () {
		return {
			restrict: 'E',
			scope: { item: '=item', type: '=type' },
			templateUrl: 'scripts/book/book.html',
			controller: 'productsController as vm', // https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y032
			bindToController: true
		} 
	};

	angular.module('books')
		.controller('productsController', productsController)
		.directive('singleBook', bookDirective);
		
}());