(function () {
	'use strict';

	// how many recommended books are showed in the detail page
	var AMOUNT_OF_RECOMMENDED = 3;

	var detailController = function detailController ($stateParams, booksService) {
		var controller = this,
			book = $stateParams.book;

		controller.book = book;

		// get recomendation from the booksService
		booksService.getRecommended(controller.book, AMOUNT_OF_RECOMMENDED)
			.then(function (response) {
				controller.books = response;
			});
	};  

	var stateConfig = function($stateProvider) {
    $stateProvider.state('layout.bookDetail', {
      url: '/detail',
      params: { book: null },
      templateUrl: 'scripts/detail/detail.html',
      controller: 'detailController as vm'
  	});
  };

	angular.module('books')
		.controller('detailController', detailController)
		.config(stateConfig);

}());