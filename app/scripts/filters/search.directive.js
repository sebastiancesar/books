(function () {
	'use strict';

	// The search directive is implemented with 
	// http://angular-ui.github.io/bootstrap/#/typeahead
	var searchController = function ($state, booksService) {
		var controller = this;

		controller.selectItem = selectItem;

		booksService.getBooks()
			.then(function (response) {
				controller.books = response;
			});

		function selectItem (book) {
			$state.go('layout.bookDetail', { book: book });
		}

	};

	var searchDirective = function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'scripts/filters/search.html',
			controller: 'searchController as vm'
		}
	};

	// filter function used in typeahead, it uses a regexp on book name or author's name
	var filterBook = function filterBook () {
		return function (input, text) {
			var re = new RegExp(text, 'i');
			
			// use _.filter from lodash
			return _.filter(input, function (book) {
				if (book.name.match(re) || book.author.name.match(re)) {
					return book;
				}
			});
			
		}
	};

	angular.module('filters')
		.filter('filterBook', filterBook)
		.controller('searchController', searchController)
		.directive('searchBook', searchDirective);

}());