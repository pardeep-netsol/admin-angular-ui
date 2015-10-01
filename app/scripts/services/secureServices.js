'use strict'

angular.module('angularjsApp').factory('secureService',function($http, wsURL,api,port, $location, credentialStore, $localstorage, $rootScope){
	
  
	var getAllCategories = function(){
  	var url = wsURL+port+api + "categories/roots.json"
    return $http.get(url).then(function(data, status, headers, config){
      if (!data.error) {
       	return data;
     	}
    });
	}

  var getchildren = function(name){
    var url = wsURL+port+api + "categories/children.json?name="+name
    return $http.get(url).then(function(data, status, headers, config){
      if (!data.error) {
        return data;
      }
    });
  }

  var getCountries = function(){
    var url = wsURL+port+api + "countries.json"
    return $http.get(url).then(function(data, status, headers, config){
      return data;
    });
  }

  var getStates = function(country){
    var url = wsURL+port+api + "countries/states.json?country="+country
    return $http.get(url).then(function(data, status, headers, config){
      if (!data.error) {
        return data;
      }
    });
  }
  
  var login = function(user){
    var url = wsURL+port+"users/sign_in.json"
    var header = {headers:{'Authorization':'Token token=nil','Content-type':'application/json'}}
    return $http.post(url, user, header).then(function(data){ 
      credentialStore.setUserData(data.data.user, data.data.user.authentication_token)
      var categories = getCategoryTree();
      categories.then(function(result){
        credentialStore.setCategorires(result);
        $location.path('/');
        $('#login-modal').modal('hide');
      });
    },function(data){
      $("#error_msg").html(data.data.error);
      $("#error_msg").show();
    }
  );    
  }

  var registerNewUser = function(user){
    var url = wsURL+port+"users.json"
    var header = {headers:{'Authorization':'Token token=nil','Content-type':'application/json'}}
    return $http.post(url, user, header).then(function(data){ 
      credentialStore.setUserData(data.data)
      var categories = getCategoryTree();
      categories.then(function(result){
        credentialStore.setCategorires(result);
        $location.path('/profile');
        $('#signup-modal').modal('hide');
      });
    },function(data){
      $rootScope.registerErrors = data.data.errors;
      $("#signup_server_error_msg").show();
    }
  );
  }

  var forgotPassword = function(user){
    var url = wsURL+port+"users/password.json"
    return $http.post(url, user).then(function(data){
      $("#alert_msg").show();
      $location.path("/");
      $('#forgot-password-modal').modal('hide');
    },function(data){
      $rootScope.invalid_email = data.data.errors.email; 
      $("#forgot_server_error_msg").show();
    }
  );
  }

  var updateUserPassword = function (user, current_user){
    var url = wsURL+port+api + "users/"+current_user.id+"/update_password.json"
    return $http.put(url, user).then(function(data){
      if (data.data.status_code == 1){
        $("#password_form").hide();
        $("#msg_box").html("Password Change Successfully");
        $("#alert_msg").show();
      }else{
        $("#chngpswd_error_msg").html("<li>"+data.data.error+"</li>")
        $("#chngpswd_error_msg").show();
      }
    });
  }

  var getCategoryTree = function(){
    var url = wsURL+port+api + "categories/tree.json";
    return $http.get(url).then(function(data, status, headers, config){
      if (!data.error) {
        return data;
      }
    });
  }

	var getpage = function(categoryname, pagename){
		var url = wsURL+port+api + "pages/page.json?name="+pagename+"&category_name="+categoryname
		return $http.get(url, credentialStore.getheaders()).then(function(data, status, headers, config){
    	if (!data.error) {
       	return data;
     	}
    });
	}

	var getCategoryPages = function(categoryName){
   	var url = wsURL+port+api + "categories/pages.json?category_name="+categoryName
		return $http.get(url, credentialStore.getheaders()).then(function(data, status, headers, config){
    	if (!data.error) {
       	return data;
     	}
    });
	}

	var getallUser = function(){
		var url = wsURL+port+api + "users";
    return $http.get(url).then(function(data, status, headers, config){
    	if (!data.error) {
       	return data;
     	}
    });
  }
  
  var getuserprofile = function(id){
    var url = wsURL+port+api + "users/"+id+".json";
  	return $http.get(url,credentialStore.getheaders()).then(function(data, status, headers, config){
     	return data;
    });
  }
  
  var getallfaqs = function(){
    var url = wsURL+port+api + "faq_categories.json"
    return $http.get(url).then(function(data, status, headers, config){
      return data;
    });
  }

  var getfaqbycategory = function(categoryname){
    var url = wsURL+port+api + "faq_categories/faqs.json?name="+categoryname;
    return $http.get(url).then(function(data){
      return data;
    });
  }

  var updateUser = function(user_data, id){
   	var url = wsURL+port+api+ "users/"+id+".json"
  	$http.put(url, user_data, credentialStore.getheaders()).success(function(data){
      if (data.error){
        alert("Error: " + data.error);
      }
      else {
        credentialStore.updateUserData(data.user)
        $location.path('/profile');
      }
    })
  }

  var checkUserEmail = function(data){
    var url = wsURL + "users/check_availability?email="+ data
    return $http.get(url).success(function(data){
      return data;
    })
  }

  var checkUserName = function(data){
    var url = wsURL + "users/check_availability?username="+ data
    return $http.get(url).success(function(data){
      return data;
    })
  }

	return {
		getAllCategories:getAllCategories,
		getCategoryPages:getCategoryPages,
		getallUser:getallUser,
		getuserprofile:getuserprofile,
		updateUser:updateUser,
		getpage:getpage,
    getCategoryTree:getCategoryTree,
    login:login,
    registerNewUser:registerNewUser,
    getCountries:getCountries,
    getStates:getStates,
    getchildren:getchildren,
    getallfaqs:getallfaqs,
    getfaqbycategory:getfaqbycategory,
    forgotPassword:forgotPassword,
    updateUserPassword:updateUserPassword,
    checkUserName:checkUserName,
    checkUserEmail:checkUserEmail
	};
});
