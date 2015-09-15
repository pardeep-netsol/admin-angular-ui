angular.module('angularjsApp')
  .controller('CategoryCtrl', function ($scope, secureService, $routeParams, $rootScope, $localstorage) {
   	$scope.page = "this is category page";
   	$localstorage.set('category_name', $routeParams.categoryName);
    // $scope.collapseAll=true;
   	var cattree = secureService.getCategoryTree();
    cattree.then(function(result){
      $scope.list = result.data.categories;
     });
   // 	var pages = secureService.getCategoryPages($routeParams.categoryName);
  	// pages.then(function(result){
   // 		$scope.categoryPages = result;
   //  });
  });