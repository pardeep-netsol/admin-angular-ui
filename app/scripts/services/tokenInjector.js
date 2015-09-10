'use strict'

angular.module('angularjsApp').factory('tokenInjector',function($rootScope, $localstorage){
	return {
    request: function(config){
      if (credentialStore.isLoggedIn()) {
    		var header = {headers:{'Authorization': 'Token token='+credentialStore.getToken()}}
    		$localstorage.set('header',header)
  	
        // if (config.data){
        //   config.data.token = credentialStore.getToken();
        // }
        // else {
          // var newUrl = config.url + "?token=" + credentialStore.getToken();
          // config.url = newUrl;
      }
    
    return config;
  }
}
});