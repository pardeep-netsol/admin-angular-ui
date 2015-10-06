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
    'ui.tree',
    'satellizer',
    'directives',
    'directive.loading'
  ])

  .constant("wsURL", "http://localhost")
  // .constant("wsURL", "http://192.168.0.202")
  .constant("port",":3000/")
  // .constant("port",":8500/")
  .constant("api","api/v1/")
  // .constant("wsURL", "http://192.168.0.202:8500/api/v1/")
  .config(function ($routeProvider, $httpProvider,  $locationProvider, $authProvider) {
//   // .constant("wsURL", "http:/localhost:3000/api/v1/")
//   .constant("wsURL", "http://192.168.0.202:8500/api/v1/")
//   .config(function ($routeProvider, $httpProvider, $authProvider, $locationProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('tokenInjector');

    $authProvider.linkedin({
      clientId: '75zih9h8w97e8m',
      url: 'http://localhost:3000/users/social_login/linkedin.json',
      // url: 'http://192.168.0.202:8500/users/social_login/linkedin.json',
      redirectUri: 'http://localhost:9000/',
      // redirectUri: 'http://192.168.0.202:9000/',
      state: '~!@#$%^&*()',
      type: '2.0',
      popupOptions: { width: 527, height: 582 },
      provider: 'linkedin',
      name: 'linkedin'
    });

    $authProvider.facebook({
      clientId: '1047234745287179',
      url: 'http://localhost:3000/users/social_login/facebook.json',
      // url: 'http://192.168.0.202:8500/users/social_login/facebook.json',
      redirectUri: 'http://localhost:9000/',
      // redirectUri: 'http://192.168.0.202:9000/',
      state: '~!@#$%^&*()',
      type: '2.0',
      popupOptions: { width: 527, height: 582 },
      provider: 'facebook',
      name: 'facebook'
    });

    $authProvider.twitter({
      url: 'http://localhost:3000/users/social_login/twitter.json'
      // url: 'http://192.168.0.202:8500/users/social_login/twitter.json',
    });

    $authProvider.google({
      url: 'http://localhost:3000/users/social_login/google.json',
      // url: 'http://192.168.0.202:8500/users/social_login/google.json',
      clientId: '78047627535-nrmfjhhegou9snqmnq8v44th9273osog.apps.googleusercontent.com',
      redirectUri: 'http://localhost:9000/'
      // redirectUri: 'http://192.168.0.202:9000/'
     });

    

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
       .when('/confirm_email/:Token', {
        templateUrl:'views/main.html',
        controller: 'ConfirmationCtrl',
        controllerAs: 'confirm'
      })
       .when('/reset_password/:ResetToken', {
        templateUrl:'views/reset_password.html',
        controller: 'ConfirmationCtrl',
        controllerAs: 'confirm'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.run(function(secureService , $rootScope, $location, credentialStore, $auth, $http){
  $rootScope.countries = secureService.getCountries();
  var faqs = secureService.getallfaqs();
  faqs.then(function(result){
    $rootScope.allfaqs = result.data;
  });
  $rootScope.user = {
    user:{login: "",
    password: "",
    rememberMe:false
  }}

  $rootScope.resendmail = {
    user:{email: ""}
  } 

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
    if (user.user.login == ""){
      $("#error_msg").html("Email can't be empty");
      $("#error_msg").show().fadeOut(4000);
       return false;
    }else if(user.user.password==""){
      $("#error_msg").html("password can't be empty");
      $("#error_msg").show().fadeOut(4000);
      return false;
    }
    secureService.login(user);
  }
  $rootScope.forgotpass = {
    user:{email:""}
  } 

  $rootScope.forgotPassword = function(forgotpass){
    secureService.forgotPassword(forgotpass);
    // alert(user.email);
  }

  $rootScope.logout = function(){
    credentialStore.removeUserData();
  }

  $rootScope.showLoginModel=function(){
     $(".chnglogin").val("");
  }

  $rootScope.showRegisterModel = function(){
    $('#login-modal').modal('hide');
    $('#signup-modal').modal('show');
    $(".chngreguser").val("");
  }

  $rootScope.showforgotpasswordmodel = function(){
    $('#login-modal').modal('hide');
    $('#forgot-password-modal').modal('show');
    $(".chngpass").val("");
  }

  $rootScope.showResendConfirmationModel = function(){
   $('#login-modal').modal('hide');
   $('#resend-confirm-email-modal').modal('show');
   $(".chngresendc_mail").val("");
  }

  $rootScope.resend_confirm_mail = function(data){
    secureService.sendConfirmationMail(data)
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

  $rootScope.parseErrors = function(data){
    var key_text; 
    var htmlList = "";
    var errorList = [];
    var errorMsg;

    Object.keys(data).forEach(function(key){
      key_text = key.replace(/_/g, ' ');
      data[key].forEach(function(err){
        errorMsg = key_text + " " + err;
        errorList.push(errorMsg);
        htmlList += '<li>' + errorMsg + '</li>'
      })
    });
    return {htmlList: htmlList, errorList: errorList}
  }
  
  $rootScope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(data) {
          if (data.status == 200 && data.data.status_code == 1){
            credentialStore.setUserData(data.data.user)
            var categories = secureService.getCategoryTree();
            categories.then(function(result){
              credentialStore.setCategorires(result);
            });
            $location.path('/');
            $('#login-modal').modal('hide');            
          }
          else{
            alert('oops! something went wrong!');
          }
        })
    .catch(function(response) {
      alert('oops! something went wrong!');
    });
  };
});

var directives = angular.module('directives', []);
