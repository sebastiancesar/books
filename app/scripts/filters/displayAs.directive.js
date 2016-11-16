(function () {
	'use strict';

	var displayAsController = function displayAsController (streamsService) {
		var controller = this,
			booksDisplay = streamsService.getStream('booksDisplay');

		controller.selected = 'grid';
		controller.setDisplay = setDisplay;
		
		function setDisplay (type) {
			controller.selected = type;
			booksDisplay.onNext({ name: 'update', type: type} );
		}

	};

	var displayAsDirective = function displayAsDirective () {
		return {
			restrict: 'E',
			templateUrl: 'scripts/filters/displayAs.html',
			controller: 'displayAsController as vm'
		};
	};

	angular.module('filters')
		.controller('displayAsController', displayAsController)
		.directive('displayAs', displayAsDirective)
}());