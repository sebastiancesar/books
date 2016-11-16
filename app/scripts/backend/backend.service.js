(function () {
	'use strict';

	var backendService = function ($http, $q) {
		var service = {},
			catalogs = {
				category:  [{ label: 'Fiction', criteria: 'category', value: 'Fiction' },
				 { label: 'Non-finction', criteria: 'category', value:'Non-Fiction' }],

					genre: [{ label: 'Sports', criteria: 'genre', value: 'Sports' },
					 { label: 'Law', criteria: 'genre', value: 'Law'},
					 { label: 'History', criteria: 'genre', value: 'History'} ]	
			};
		// Catalogs are used for populate filters combos, and so.

		service.getBooks = getBooks;
		service.getCatalogs = getCatalogs;

		function getBooks () {
			// Here should be the comunication with the api.
			return $http.get('data/books.json')
				.then(function (response) {
					return response.data;
				});
		}

		function getCatalogs(criteria) {
			// This catalogs should come from the backend also, 
			// but for simplicity are hardcoded here.			
			return $q.when(catalogs[criteria]);
		}

		return service;
	
	};

	angular.module('backend')
		.factory('backendService', backendService);

}());