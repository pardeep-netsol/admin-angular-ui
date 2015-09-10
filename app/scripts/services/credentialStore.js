'use strict'

angular.module('angularjsApp').factory('credentialStore',function($rootScope, $localstorage){
  function setUserData(user, jwtToken){
    $rootScope.current_user = user;
    $rootScope.Token = jwtToken;
    $rootScope.Email = user.email;
    $localstorage.set("Token", jwtToken);
    $localstorage.set("Email", user.email);
    // var categories = categories;
    // categories.then(function(result){
    //   $rootScope.allcategories = result.data;
    // });

    // $localstorage.set('jwtToken', jwtToken);
    // $localstorage.set('type', 'user');
   }

   function getheaders(){
    var header = {headers: {
                  'Authorization':'Token token='+getToken(),
                  'user-email':getEmail() 
                  }
                };
    return header;
   }

   function setCategorires(Categories){
    $rootScope.allCategories = Categories.data;
   }

   function updateUserData(user){
    $rootScope.current_user = user;
   }

   function isLoggedIn(){
    // var jwtToken = $localstorage.get('jwtToken');
    // && jwtToken != null
    return ($localstorage.get("Token") != null);
  }

  function getToken(){
    // return $rootScope.Token;
    return $localstorage.get("Token")
  }

  function getEmail(){
    // return $rootScope.Email;
    return $localstorage.get("Email")
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