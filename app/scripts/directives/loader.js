angular.module('directive.loading', [])
.directive('loading',   ['$http' ,function ($http)
{
  return {
    restrict: 'A',
    link: function (scope, elm, attrs)
    {
      scope.isLoading = function () {
        // window.setTimeout(function(){return $http.pendingRequests.length > 0}, 250);

        return $http.pendingRequests.length > 0
      };
      scope.$watch(scope.isLoading, function (v)
      {
        if(v){
          window.setTimeout(function(){
            if ($http.pendingRequests.length > 0){
            elm.show(); 
            }else{elm.hide()}
          }, 2000);
          // elm.show();
        }else{
          elm.hide();
        }
      });
    }
  };
}]);