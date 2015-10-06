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
    $rootScope.current_user = user;
    sessionStorage.setItem('current_user', JSON.stringify(user));
  }

   function isLoggedIn(){
    // var jwtToken = $localstorage.get('jwtToken');
    // && jwtToken != null
    return (sessionStorage.getItem('Token') != '' && sessionStorage.getItem('Token') != null);
  }

  function getToken(){
    return sessionStorage.getItem('Token');
    // return $localstorage.get("Token")
  }

  function getEmail(){
    return sessionStorage.getItem('Email'); 
    // return $localstorage.get("Email")
  }

  function setEmailAndToken(Token, Email){
    sessionStorage.setItem('Token', Token);
    sessionStorage.setItem('Email', Email);
  }

  function setRememberMe(user){
    localStorage.setItem('token', user.authentication_token)
    localStorage.setItem('email', user.email)
  }

  function removeUserData(){
    $rootScope.current_user = null;
    $rootScope.Token = null;
    $rootScope.allCategories = [];
    sessionStorage.setItem('current_user', '')
    sessionStorage.setItem('Token', '')
    sessionStorage.setItem('Email', '');
    localStorage.setItem('token', '')
    localStorage.setItem('email', '')

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
    getheaders:getheaders,
    setEmailAndToken:setEmailAndToken,
    setRememberMe:setRememberMe
  }
});
