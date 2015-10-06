angular.module('angularjsApp')
  .controller('FaqCtrl', function ($scope, secureService, $routeParams, $rootScope, $localstorage, $sce) {
    $rootScope.title = "Faqs";
   	var allfaqs = secureService.getfaqbycategory($routeParams.faqCategoryName);
    allfaqs.then(function(result){
      $scope.faqs = result.data.faqs;
      $scope.div = document.createElement('div');
      var data = "";
      result.data.faqs.forEach(function(faq){
        $scope.div.innerHTML = faq.answer;
        $($scope.div.getElementsByTagName('img')).map(function(){
          var src = "http://localhost:3000"+$(this).attr('src');
          this.src = src;
        });
        faq.answer = $($scope.div).prop('outerHTML') 
    });  
  });
});
