angular.module('angularjsApp')
  .controller('UserCtrl', function ($scope, secureService) {
  	// $scope.showUsers = function() {
     // 	var usersData = secureService.getallUser();
    	// usersData.then(function(result){
    	// 	$scope.users = result;
     // 	});
  		$scope.datepickerOptions = {
    		format: 'yyyy-mm-dd',
    		language: 'fr',
    		autoclose: true,
   	 		weekStart: 0
  		};

     	var profile = secureService.getuserprofile();
     	profile.then(function(result){
     		$scope.userprofile = result;
     		$scope.user = {
     			first_name: result.data.first_name,
     			last_name: result.data.last_name,
     			gender: result.data.gender,
     			dob: result.data.dob,
     			email: result.data.email
     		}
     	});

     	$scope.savedetails =function(user){
     		alert(user.first_name);
     	}

    // }
  });


