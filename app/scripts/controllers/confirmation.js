angular.module('angularjsApp')
  .controller('ConfirmationCtrl', function ($scope, $routeParams, secureService, $location) {
  	if($location.url() == "/confirm_email/"+$routeParams.Token ){
			secureService.confirmEmail($routeParams.Token)  		
  	}else if($location.url() == "/reset_password/"+$routeParams.ResetToken){
  		$scope.user_password = {
  			user:{reset_password_token: $routeParams.ResetToken,
  						password: "",
  						password_confirmation: ""}
  		}
  	}
    $scope.isMatch = false;
  	$scope.resetUserPassword = function(user){
      if(user.user.password != user.user.password_confirmation){
        $scope.isMatch =true;
      }else{
        secureService.resetPassword(user)
      }
  	}

  });