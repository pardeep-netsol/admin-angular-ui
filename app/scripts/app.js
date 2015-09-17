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
  if(!credentialStore.isLoggedIn()){
    $location.path('/');
  }
  if (sessionStorage.getItem('Token') != null) {
    $rootScope.current_user = JSON.parse(sessionStorage.getItem('current_user'));
    $rootScope.allCategories = JSON.parse(sessionStorage.getItem('categories'));
  }

  $rootScope.login = function(user){
    secureService.login(user);
    // alert(user.email);
  }
  $rootScope.logout = function(){
    credentialStore.removeUserData();
  }

  // var linked_in = function(data){
  //   alert(data);
  // }
  // $rootScope.authenticate = function(provider) {
  //     $auth.authenticate(provider)
  //       .then(function(data) {
  //         debugger
  //         credentialStore.setUserData(data.data.user, data.data.user.authentication_token)
  //         var categories = getCategoryTree();
  //         categories.then(function(result){
  //           credentialStore.setCategorires(result);
  //           $location.path('/');
  //           $('#login-modal').modal('hide');
  //         });
  //   // Signed in with Google.
  //     })
  //   .catch(function(response) {
  //     // Something went wrong.
  //   });
  //   };
 
  $rootScope.countries = secureService.getCountries();
  // $rootScope.faqs = secureService.getallfaqs();
<<<<<<< HEAD

  // $http.defaults.headers.common.Authorization = 'Token token=' + $rootScope.Token;
  // $http.defaults.headers.common['user-email'] = $rootScope.Email;
  // $http.defaults.headers.common['Content-Type'] = 'application/json';
  
=======
>>>>>>> 2606965415a1440ba897d3fde54642f90b1115b4
});
