'use strict'

angular.module('angularjsApp').factory('tokenInjector',function($rootScope, $localstorage, credentialStore){
  return {
    request: function(config){
      if (credentialStore.isLoggedIn()) {
     	config.headers['Authorization'] = 'Token token=' + credentialStore.getToken();
        config.headers['user-email'] = credentialStore.getEmail();
        config.headers['Content-Type'] = 'application/json';
  	  }
    return config;
  }
}
});