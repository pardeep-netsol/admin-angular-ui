angular.module('angularjsApp')
  .controller('FaqCtrl', function ($scope, secureService, $routeParams, $rootScope, $localstorage) {
   
   	var allfaqs = secureService.getfaqbycategory($routeParams.faqCategoryName);
    debugger
    allfaqs.then(function(result){
      $scope.faqs = result.data.faqs;
    }); 
    $scope.myvalue =true;
    $scope.toggle = function(){
    	$scope.myvalue = !$scope.myvalue
    } 
  });