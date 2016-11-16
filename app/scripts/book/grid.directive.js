(function () {
	'use strict';
	
	// Grid directive is used for display a set of books, in a grid layout.

	var BOOKS_PER_PAGE = 12;

	var gridController = function gridController (booksService, streamsService) {
		var controller = this,
			booksStream = streamsService.getStream('books'),
			booksDisplayStream = streamsService.getStream('booksDisplay');

		controller.currentPage = 1;
		controller.pageSize = BOOKS_PER_PAGE;
  	controller.displayAs = 'grid';
  	
		booksService.getBooks()
			.then(function (response) {
				controller.books = response; // initialize showing all books.
			});

		// listen for an update stream, meaning one o more filter was applyed.
		booksStream.subscribe(function (stream) {
			if (stream.name === 'update') {
				controller.books = stream.books;
			} 
		});

		booksDisplayStream.subscribe(function (stream) {
			if (stream.name === 'update') {
				controller.displayAs = stream.type;
			} 
		});

	};

	var gridDirective = function gridDirective () {
		return {
			scope: {},
			templateUrl: 'scripts/book/grid.html',
			controller: 'gridController as vm'
		}
	}

	angular.module('books.grid', [])
		.controller('gridController', gridController)
		.directive('booksGrid', gridDirective);
}());