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
  .constant("wsURL","http://172.16.13.52:3000/api/v1/")
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
  $rootScope.countries = secureService.getCountries();
  // $rootScope.faqs = secureService.getallfaqs();
});
