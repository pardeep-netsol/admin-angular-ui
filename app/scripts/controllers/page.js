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
    $scope.page12 = "The is Demo page"+ $localstorage.get('category_name');

    var requestpage = secureService.getpage($localstorage.get('category_name'), $routeParams.pageName); 
    requestpage.then(function(result){
   		$scope.page = result;
   		$scope.content = result.data.content;
    		// alert("hello");

    });
    // $scope.getimage = function(){
    // 	alert("hello");
    // };
    // function getimage(){
    // 	alert("hello");
    // };
  });
