'use strict';

/**
 * @ngdoc overview
 * @name angularjsApp
 * @description
 * # angularjsApp
 *
 * Main module of the application.
 */
angular
  .module('angularjsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'jkuri.datepicker',
    'ui.tree'
    // 'satellizer'
  ])

  .constant("wsURL", "http://localhost:3000/api/v1/")
  // .constant("wsURL", "http://192.168.0.202:8500/api/v1/")
  .config(function ($routeProvider, $httpProvider,  $locationProvider) {

//   // .constant("wsURL", "http://localhost:3000/api/v1/")
//   .constant("wsURL", "http://192.168.0.202:8500/api/v1/")
//   .config(function ($routeProvider, $httpProvider, $authProvider, $locationProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // $authProvider.linkedin({
    //   // clientId: '75zih9h8w97e8m',
    //   // url: 'http://localhost:3000/api/v1/users/social_login',
    //   // redirectUri: 'http://localhost:9000',
    //   // // provider: 'linkedin'
    //   // name: 'linkedin'

    //   clientId: '75zih9h8w97e8m',
    //   url: 'http://localhost:3000/users/social_login/linkedin',
    //   authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
    //   redirectUri: 'http://localhost:9000/',
    //   // requiredUrlParams: ['state'],
    //   // scope: ['r_emailaddress'],
    //   // scopeDelimiter: ' ',
    //   state: '9876543210',
    //   type: '2.0',
    //   popupOptions: { width: 527, height: 582 }
    // });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/faqs/:faqCategoryName', {
        templateUrl: 'views/faqs.html',
        controller: 'FaqCtrl',
        controllerAs: 'faq'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/users', {
        templateUrl:'views/users.html',
        controller: 'UserCtrl',
        controllerAs: 'users'
      })
      .when('/profile', {
        templateUrl:'views/profile.html',
        controller: 'UserCtrl',
        controllerAs: 'users'
      })
      .when('/editprofile', {
        templateUrl:'views/editprofile.html',
        controller: 'UserCtrl',
        controllerAs: 'users'
      })
       .when('/categories/:categoryName', {
        templateUrl:'views/categoryPages.html',
        controller: 'CategoryCtrl',
        controllerAs: 'category'
      })
       .when('/content/:categoryName/:pageName', {
        templateUrl:'views/page.html',
        controller: 'PageCtrl',
        controllerAs: 'page'
      })
       .when('/auth/linkedin', {
        templateUrl:'views/main.html',
        controller: 'LinkedInCtrl',
        controllerAs: 'linkedin'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.run(function(secureService , $rootScope, $location, credentialStore,  $http){
  var faqs = secureService.getallfaqs();
  faqs.then(function(result){
    $rootScope.allfaqs = result.data;
  });
  $rootScope.user = {
    user:{email: "",
    password: ""
  }}

  $rootScope.registerUser={
    user:{
      email: "",
      password:"",
      password_confirmation:"",
      first_name:"",
      last_name:""
    }
  }
  if(!credentialStore.isLoggedIn()){
    $location.path('/');
  }
  
  if (sessionStorage.getItem('Token') != '') {
    $rootScope.current_user = JSON.parse(sessionStorage.getItem('current_user'));
    $rootScope.allCategories = JSON.parse(sessionStorage.getItem('categories'));
  }

  $rootScope.login = function(user){
    if (user.user.email == ""){
      $("#error_msg").html("Email can't be empty");
      $("#error_msg").show();
      return false;
    }else if(user.user.password==""){
      $("#error_msg").html("password can't be empty");
      $("#error_msg").show();
      return false;
    }
    secureService.login(user);
  }
  $rootScope.logout = function(){
    credentialStore.removeUserData();
  }

  $rootScope.showRegisterModel = function(){
    $('#login-modal').modal('hide');
    $('#signup-modal').modal('show');
  }

  $rootScope.signUp= function(registeruser){
    $("#signup_error_msg").hide();
    $("#signup_server_error_msg").hide();
    if (registeruser.user.first_name == ""){
      $("#signup_error_msg").append("<li>First Name can't be empty</li>");
      $("#signup_error_msg").show();
      return false;
    }else if (registeruser.user.last_name == ""){
      $("#signup_error_msg").html("Last Name can't be empty");
      $("#signup_error_msg").show();
      return false;
    }else if (registeruser.user.email == ""){
      $("#signup_error_msg").html("Email can't be empty");
      $("#signup_error_msg").show();
      return false;
    }else if (registeruser.user.password == ""){
      $("#signup_error_msg").html("Password can't be empty");
      $("#signup_error_msg").show();
      return false;
    }else if (registeruser.user.password_confirmation == ""){
      $("#signup_error_msg").html("Confirm Password can't be empty");
      $("#signup_error_msg").show();
      return false;
    }else if (registeruser.user.password != registeruser.user.password_confirmation){
      $("#signup_error_msg").html("Password and Confirm Password not match.");
      $("#signup_error_msg").show();
      return false;
    }
    secureService.registerNewUser(registeruser)
  }
  $rootScope.countries = secureService.getCountries();

  // $http.defaults.headers.common.Authorization = 'Token token=' + $rootScope.Token;
  // $http.defaults.headers.common['user-email'] = $rootScope.Email;
  // $http.defaults.headers.common['Content-Type'] = 'application/json';
  

});
