'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('PageCtrl', function ($scope, secureService, $routeParams, $rootScope, $localstorage ) {
    $scope.page12 = "The is Demo page"+ $routeParams.categoryName;

    var requestpage = secureService.getpage($routeParams.categoryName, $routeParams.pageName); 
    requestpage.then(function(result){
   		$scope.page = result;
   		$scope.content = result.data.page.content;
    });
  });
