'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('MainCtrl', function ($scope, $routeParams, secureService, credentialStore) {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    debugger
    if (!credentialStore.isLoggedIn()){
      debugger
      if (localStorage.getItem('token') != '' ){
        var token = localStorage.getItem('token');
        var email = localStorage.getItem('email');
        credentialStore.setEmailAndToken(token, email);
        secureService.getuserprofile(email);
      }
    }else{
      secureService.getuserprofile(credentialStore.getEmail());
    }
    
  });
