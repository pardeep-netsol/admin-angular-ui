'use strict'

angular.module('angularjsApp').factory('credentialStore',function($rootScope, $localstorage){
  function setUserData(user){
    sessionStorage.setItem('Token', user.authentication_token);
    sessionStorage.setItem('Email', user.email);
    sessionStorage.setItem('current_user', JSON.stringify(user));
    // $rootScope.current_user = user;
    // $rootScope.Token = user.authentication_token;
    // $rootScope.Email = user.email;
    getCurrentUser();
  }
  function getCurrentUser (){
    return $rootScope.current_user = JSON.parse(sessionStorage.getItem('current_user'));
  }

   function getheaders(){
    var header = {headers: {
                  'Authorization':'Token token='+getToken(),
                  'user-email':getEmail() ,
                  'Content-Type':'application/json'
                  }
                };
    return header;
   }

   function setCategorires(Categories){
    $rootScope.allCategories = Categories.data;
    sessionStorage.setItem('categories', JSON.stringify($rootScope.allCategories));
   }

   function updateUserData(user){
    debugger
    $rootScope.current_user = user;
   }

   function isLoggedIn(){
    // var jwtToken = $localstorage.get('jwtToken');
    // && jwtToken != null
    return (sessionStorage.getItem('Token') != null);
  }

  function getToken(){
    return sessionStorage.getItem('Token');
    // return $localstorage.get("Token")
  }

  function getEmail(){
    return sessionStorage.getItem('Email'); 
    // return $localstorage.get("Email")
  }

  function removeUserData(){
    $rootScope.current_user = null;
    $rootScope.Token = null;
    $rootScope.allCategories = [];
    // $localstorage.set('jwtToken', null);
  }

  return {
    setUserData:setUserData,
    isLoggedIn:isLoggedIn,
    getToken:getToken,
    removeUserData:removeUserData,
    getEmail:getEmail,
    updateUserData:updateUserData,
    setCategorires:setCategorires,
    getheaders:getheaders
  }
});
// 'use strict';

// /**
//  * @ngdoc function
//  * @name ngVerifiedApp.controller:MainCtrl
//  * @description
//  * # MainCtrl
//  * Controller of the ngVerifiedApp
//  */
//  angular.module('ngVerifiedApp').factory('credentialStore', function($rootScope, $localstorage){

//   function setUserData(jwtToken, user){
//     $rootScope.user = user;
//  		$rootScope.jwtToken = jwtToken;
//     $localstorage.set('jwtToken', jwtToken);
//     $localstorage.set('type', 'user');
//  	}

//   function setOrgData(jwtToken, org){
//     $rootScope.user = org;
//     $rootScope.jwtToken = jwtToken;
//     $localstorage.set('jwtToken', jwtToken);
//     $localstorage.set('type', 'org');
//   }

//   function removeUserData(){
//     $rootScope.user = null;
//     $rootScope.jwtToken = null;
//     $localstorage.set('jwtToken', null);
//   }

//   function getToken(){
//     return $rootScope.jwtToken;
//   }

//   function isLoggedIn(){
//     // var jwtToken = $localstorage.get('jwtToken');
//     // && jwtToken != null
//     return ($rootScope.jwtToken != null);
//   }

//   function setcat(data){
//     $rootScope.cat = data;
//   }

//  	return {
//     //Define API calls here.....
//     	setUser: setUserData,
//       setOrg: setOrgData,
//       unsetUser: removeUserData,
//       isLoggedIn: isLoggedIn,
//       getToken: getToken,
//       setcat: setcat
//   	};
//  });