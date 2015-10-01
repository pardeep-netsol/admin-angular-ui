'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('MainCtrl', function ($scope, $routeParams, secureService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    
    // $scope.connect = function() {
    //   alert("hello");
    //   $linkedIn.authorize();
    // }
    // if ($routeParams.categoryName!=undefined){
    // 	var subcatgory = secureService.getchildren($routeParams.categoryName)
    // 	subcatgory.then(function(result){
    // 		$scope.subcatgories = result.data;
    // 	});
    // }
    // $scope.getpages = function(category_name){
    //   var categoryPages = secureService.getCategoryPages(category_name);
    //   categoryPages.then(function(result){
    //     $scope.allpages = result.data;
    //   });
    // }
    

  //  $scope.onLinkedInLoad = function(){
  //     IN.Event.on(IN, "auth", getProfileData);
  //   }

  // function onSuccess(data) {
  //   console.log(data);
  // }

  // // Handle an error response from the API call
  // function onError(error) {
  //   console.log(error);
  // }
  
  // // Use the API call wrapper to request the member's basic profile data
  // function getProfileData() {
  //   IN.API.Raw("/people/~").result(onSuccess).error(onError);
  // }
  });
