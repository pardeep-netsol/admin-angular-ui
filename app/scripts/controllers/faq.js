angular.module('angularjsApp')
  .controller('FaqCtrl', function ($scope, secureService, $routeParams, $rootScope, $localstorage) {
   
   	var allfaqs = secureService.getfaqbycategory($routeParams.faqCategoryName);
    allfaqs.then(function(result){
      $scope.faqs = result.data.faqs;
    });
   
  });