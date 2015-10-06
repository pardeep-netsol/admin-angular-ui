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
   		$scope.page = result.data.page;
      $rootScope.title = result.data.page.meta_title;
      $scope.div = document.createElement('div');
      $scope.div.innerHTML = result.data.page.content;
      $($scope.div.getElementsByTagName('img')).map(function(){
        // var src = "http://localhost:3000"+$(this).attr('src');
        var src = "http://192.168.0.202:8500"+$(this).attr('src');
        this.src = src;
      });
      $scope.page_content = $($scope.div).prop('outerHTML');
     });
  });
