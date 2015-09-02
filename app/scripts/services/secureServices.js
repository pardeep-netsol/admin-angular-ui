'user strict'

angular.module('angularjsApp').factory('secureService',function($http, wsURL){
	
	var getallUser = function(){
		var url = wsURL + "users";
    return $http.get(url).then(function(data, status, headers, config){
    	if (!data.error) {
       	return data;
     	}
    });
  }
  var getuserprofile = function(){
  	var url = wsURL + "users/1";
  	return $http.get(url).then(function(data, status, headers, config){
    	if (!data.error) {
       	return data;
     	}
    });
  }
	return {
		getallUser:getallUser,
		getuserprofile:getuserprofile
	};
});
