"use strict"
angular.module('angularjsApp')
  .controller('UserCtrl', function ($scope, secureService, $rootScope, $location, credentialStore) {
  	$scope.VALID_FULL_NAME_REGEX=/^[a-zA-Z\s\-]+$/;
    $scope.VALID_PHONE_NUMBER_REGEX = /^(\+\d{1,2})??[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    $scope.VALID_EMAIL_REGEX = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i;
    $scope.VALID_NAME_REGEX = /^[^`!@#\$%\^&*+_=]+$/;
    $scope.VALID_ZIP_REGEX = /^[^`!@#\$%\^&*+_=]+$/;
    
    if ($rootScope.current_user == undefined){
      $location.path('/');
    }
    $scope.showDiv = function(){
      $("#password_form").toggle();
    }

    $scope.userData = {
      existing_password : "",
      user: {
        password: "",
        password_confirmation: ""
      }
    };

    $scope.changePassword = function(userData){
      secureService.updateUserPassword(userData, $rootScope.current_user)
     $(".chngpsw").val("");
    }
    
    var edituserprofile = function(){
      var state = secureService.getStates($rootScope.current_user.country_hash);
      state.then(function(result){
        $scope.states = result.data.states;
        var country = $rootScope.countries;
        country.then(function(res){
          $scope.countries = res.data.countries;
        });
      });
    }
    if ($location.url() == "/editprofile"){
      edituserprofile();
    }
        
    var userprofile = $rootScope.current_user
    $scope.user = {
      username: userprofile.username,
    	first_name: userprofile.first_name,
    	last_name: userprofile.last_name,
    	gender: userprofile.gender,
    	dob: userprofile.dob == null ?  new Date : userprofile.dob,
    	email: userprofile.email,
      country_hash: userprofile.country_hash,
      state_hash: userprofile.state_hash,
      created_at: userprofile.created_at,
      phone_number: userprofile.phone_number,
      alternate_phone_number: userprofile.alternate_phone_number,
      alternate_email_address: userprofile.alternate_email_address,
      address1: userprofile.address1,
      address2: userprofile.address2,
      zip_code: userprofile.zip_code,
      sign_in_count: userprofile.sign_in_count,
      current_sign_in_at: userprofile.current_sign_in_at,
      current_sign_in_ip: userprofile.current_sign_in_ip,
      last_sign_in_ip: userprofile.last_sign_in_ip
    }
    
    $scope.savedetails =function(user){
      if (user.country_hash != undefined && user.state_hash != undefined){
        user.country_hash = user.country_hash.name
        user.state_hash = user.state_hash.name
      }
      // if (user.first_name == undefined  ){
      //   alert("error");
      //   return false;

      // }
      var userparams = {'user': user}
    	secureService.updateUser(userparams, $rootScope.current_user.id)
    }
    $scope.getCountryStates = function(country){
      $scope.states = [];
      if (country != undefined){
        $scope.user.state_hash = ""; 
        var state = secureService.getStates(country.name);
        state.then(function(result){
          $scope.states = result.data.states;
        });
      }
    }
    $scope.wasSubmitted = false;
     $scope.submit = function() {
     $scope.wasSubmitted = true;
    };

    $scope.checkUserName = function(username){
      // alert(data);
      var result = secureService.checkUserName(username)
      result.then(function(data){
        if (data.data.status_code == 0){
          $scope.form.username.$setValidity('server',false);
        }else{
          $scope.form.username.$setValidity('server',true);
        }
      });
    }

    $scope.checkUserEmail = function(email){
      var result = secureService.checkUserEmail(email)
      result.then(function(data){
       if (data.data.status_code == 0){
          $scope.form.email1.$setValidity('server',false);
        }else{
          $scope.form.email1.$setValidity('server',true);
        }
      });
    }
  });