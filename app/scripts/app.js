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
  ])
  .constant("wsURL", "http://172.16.13.86:3000/api/v1/")
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      // .when('/:categoryName', {
      //   templateUrl: 'views/main.html',
      //   controller: 'MainCtrl',
      //   controllerAs: 'main'
      // })
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
       .when('/:categoryName/:pageName', {
        templateUrl:'views/page.html',
        controller: 'PageCtrl',
        controllerAs: 'page'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
.run(function(secureService , $rootScope, $location, credentialStore){
  // var categories = secureService.getCategoryTree();
  // categories.then(function(result){
  //   $rootScope.allcategories = result.data;
  // });
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
  $rootScope.countries = secureService.getCountries();
});
