angular.module('angularjsApp')
  .controller('FaqCtrl', function ($scope, secureService, $routeParams, $rootScope, $localstorage,$sce) {
   
   	var allfaqs = secureService.getfaqbycategory($routeParams.faqCategoryName);
    debugger
    allfaqs.then(function(result){
      $scope.faqs = result.data.faqs;
      $scope.to_trusted = function(html_code) {
     return $sce.trustAsHtml(html_code);
     }

      $scope.div = document.createElement('div');
      var data = ""
      result.data.faqs.forEach(function(faq){
        data = data+" "+faq.answer
      });
      $scope.div.innerHTML = data;
      $($scope.div.getElementsByTagName('img')).map(function(){
        var src = "http://localhost:3000"+$(this).attr('src');
        this.src = src;
      });
      $scope.faqs_content = $($scope.div).prop('outerHTML');
      debugger
  //     $scope.myvalue =false;
  //   $scope.toggle = function(obj){    	
  //   	var myEl = angular.element(document.querySelector('#div_'+obj));    
  //   	debugger;	
		// myEl.toggle();  
  //   	// $(obj).myvalue = false; 
  //   	// var id = obj.$id
  //   	// debugger;
  //   	// $($(id)+'div')
    	
  //   	$scope.myvalue = true;
  
  //   } 
  });
});
