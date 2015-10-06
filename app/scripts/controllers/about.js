'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('AboutCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.title = "About Us";
  });
