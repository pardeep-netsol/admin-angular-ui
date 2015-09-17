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
    'satellizer'
  ])
  .constant("wsURL","http://172.16.13.52:3000/api/v1/")
  .config(function ($routeProvider, $httpProvider) {
// =======
//   // .constant("wsURL", "http://localhost:3000/api/v1/")
//   .constant("wsURL", "http://192.168.0.202:8500/api/v1/")
//   .config(function ($routeProvider, $httpProvider, $authProvider, $locationProvider) {
// >>>>>>> 686af7ceb6514b882c2215ba8adf981b635f8e61
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $authProvider.linkedin({
      clientId: '75qwniykoelwjm',
      url: 'http://localhost:3000/api/v1/users/social_login'
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
       .when('/page/:categoryName/:pageName', {
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
      $locationProvider.html5Mode(true);
  })
.run(function(secureService , $rootScope, $location, credentialStore, $auth){
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
  $rootScope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          alert("success");
    // Signed in with Google.
      })
    .catch(function(response) {
      // Something went wrong.
      alert(response);
    });
    };
 
  $rootScope.countries = secureService.getCountries();
  // $rootScope.faqs = secureService.getallfaqs();
});
