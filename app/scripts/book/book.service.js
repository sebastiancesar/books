(function () {
	'use strict';

	// Bookservice is for handling the book collection's. 
	// All the request/filtering are centralized in this service.
	var booksService = function ($q, backendService, streamsService) {
		var service = {},
			pagination = { currentPage: 1, totalItems: 0 }, // initialize pagination params
			booksStream = streamsService.getStream('books'), // request the stream for books
			filtersApplyed = [],
			allBooks = [];

		service.getBooks = getBooks;
		service.getRecommended = getRecommended;

		// Return recommended books. In this case, the recommendation is random, in a real
		// situation, the recommended book are calculated in the bakend, based on category/genre, users feedback, etc. 
		// @book is the book selected by the user, @amount is the amount of recommendations asked.
		function getRecommended (book, amount) {
			var i,
				deferred = $q.defer(),
				recommendedBooks = [];
			
			_.times(amount, function () { // for 1 to amount ...
				var position = _.random(0, (allBooks.length - 1));
				recommendedBooks.push(allBooks[position]);
			});

			deferred.resolve(recommendedBooks);
			return  deferred.promise;;

		}

		// Very basic implementation to handle filters criteria. 
		// Adapt from a catalog item to filtering item wich is used for _.filter function.
		// @itemsFilter eg: [{ label: 'Fiction', criteria: 'category', value: 'Fiction' }...]
		function getCriteria (itemsFilter) {
			var result = [];
			itemsFilter.forEach(function (item) {
				if (item.criteria === 'genre') {
					result.push({genre: { name: item.value}});
				} else if (item.criteria === 'category') {
					result.push({genre: {category: item.value }});
				}
			});	
			return result;
		}

		// Request from backend all the books. In this case, there is no filtering in the backend, 
		// all the processing is done in the front.
		function getBooks () {
			return backendService.getBooks()
				.then(function (response) {
					allBooks = response; // keep a copy of all the books, without filtering.
					return allBooks;
				});
		}

		function applyFilters () {
			var books = allBooks;
			// apply each filter criteria over the collection with all the books.
			getCriteria(filtersApplyed).forEach(function (filter) {
				books = _.filter(books, filter); // https://lodash.com/docs/4.17.0#filter
			});
			// publish an update stream with the filtered collection.
			booksStream.onNext({name: 'update', books: books});
		}

		// listen for stream of filtering.
		booksStream.subscribe(function (stream) {
			// when a filter is selected from the ui
			if (stream.name === 'applyFilter') {
				filtersApplyed.push(stream.item); // add the filter criteria to the array of filters,
				applyFilters(); // and apply it.
			} else if (stream.name === 'removeFilter') {
				_.pull(filtersApplyed, stream.item);
				applyFilters();
			}
		});
	
		return service;
	
	};

	angular.module('books')
		.factory('booksService', booksService);

}());