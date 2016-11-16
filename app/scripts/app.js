'use strict';

/**
 * @ngdoc overview
 * @name reedsyApp
 * @description
 * # reedsyApp
 *
 * Main module of the application.
 */
angular
  .module('reedsyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'rx',
    'angularUtils.directives.dirPagination',
    'landing',
    'backend',
    'layout', 
    'books',
    'books.grid',
    'streams',
    'filters'
  ])
  .config(function ($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/landing');
  });
