(function () {
	'use strict';

	// An abstract state to define the layout of the app. 
	// All state should be childs of this state.

	var stateConfig = function($stateProvider) {
    $stateProvider.state('layout', {
      abstract: true,
      templateUrl: 'scripts/layout/layout.html'
  	});
  };


  angular.module('layout', [])
  	.config(stateConfig);

}());
