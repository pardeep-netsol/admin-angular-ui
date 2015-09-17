angular.module('angularjsApp')
  .controller('FaqCtrl', function ($scope, secureService, $routeParams, $rootScope, $localstorage,$sce) {
   
   	var allfaqs = secureService.getfaqbycategory($routeParams.faqCategoryName);
    allfaqs.then(function(result){
      $scope.faqs = result.data.faqs;
      $scope.to_trusted = function(html_code) {
     return $sce.trustAsHtml(html_code);
     }

      // $scope.div = document.createElement('div');
      // $scope.div.innerHTML = result.data.faqs.answer;
      // $($scope.div.getElementsByTagName('img')).map(function(){
      //   var src = "http://localhost:3000"+$(this).attr('src');
      //   this.src = src;
      // });
      // $scope.faqs_content = $($scope.div).prop('outerHTML');
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