(function () {
	'use strict';

  var stateConfig = function stateConfig ($stateProvider) {
    $stateProvider.state('layout.landing', {
      url: '/landing',
      templateUrl: 'scripts/landing/landing.html'
    });
  };

	angular.module('landing', [])
    .config(stateConfig);
	
}());