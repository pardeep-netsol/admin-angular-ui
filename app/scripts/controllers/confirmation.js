angular.module('angularjsApp')
  .controller('ConfirmationCtrl', function ($scope, $routeParams, secureService, $location) {
  	debugger
  	if($location.url() == "/confirm_email/"+$routeParams.Token ){
		secureService.confirmEmail($routeParams.Token)  		
  	}
  });