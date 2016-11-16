(function () {
	'use strict';

	// Directives to filter in the main grind.

	// Category and Genre share the same controller (not the same instance)
	var filterController = function filterController ($scope, streamsService, backendService) {
		var controller = this,
			itemSelected,
			bookListStream = streamsService.getStream('books');

		controller.select = select;
		controller.remove  = remove;

		// get from the back the filters criteria (categories names, genres, etc)
		backendService.getCatalogs($scope.criteria)
			.then(function (response) {
				controller.items = response;
			});

		// remove a filter
		function remove (item) {
			itemSelected.selected = false 
			itemSelected = null;
			// publish on the stream that a filter was removed, so the booksSerice can re-filter the book collection's
			bookListStream.onNext({ name: 'removeFilter', item: item });
		}

		function select (item) {
			if (itemSelected) { // if the filter was already applyed, remove it.
				remove(itemSelected); 
			};
			itemSelected = item; 
			itemSelected.selected = true;
			// publish that a new filter was applyed
			bookListStream.onNext({ name: 'applyFilter', item: item });
		}

	};

	var genreFilterDirective = function genreFilterDirective () {
		return {
			restrict: 'E',
			scope: { criteria: '=criteria' },
			templateUrl: 'scripts/filters/genre.html',
			controller: 'filterController as vm',
		};
	};

	var categoryFilterDirective = function categoryFilterDirective () {
		return {
			restrict: 'E',
			scope: { criteria: '=criteria' },
			templateUrl: 'scripts/filters/category.html',
			controller: 'filterController as vm'
		};
	};

	var paginationDirective = function paginationDirective () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'scripts/filters/pagination.html'
		};
	};

	angular.module('filters', [])
		.controller('filterController', filterController)
		.directive('pagination', paginationDirective)
		.directive('categoryFilter', categoryFilterDirective)
		.directive('genreFilter', genreFilterDirective);

}());