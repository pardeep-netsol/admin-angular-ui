'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('MainCtrl', function ($scope, $routeParams, secureService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if ($routeParams.categoryName!=undefined){
    	var subcatgory = secureService.getchildren($routeParams.categoryName)
    	subcatgory.then(function(result){
    		$scope.subcatgories = result.data;
    	});
    }
    $scope.getpages = function(category_name){
      var categoryPages = secureService.getCategoryPages(category_name);
      categoryPages.then(function(result){
        $scope.allpages = result.data;
      });
    }

  });
