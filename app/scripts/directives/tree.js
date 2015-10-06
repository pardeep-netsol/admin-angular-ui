var directives;

directives = angular.module('directives');

directives.directive('tree', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      tree: '='
    },
    templateUrl: 'tree/navbar-ul.html',
    link: function(scope, element, attrs) {
      if (scope.tree.pages.length > 0){
        scope.tree.pages.forEach(function(page){
          element.append('<li><a href="#/content/'+scope.tree.name+'/'+page.name+'">'+page.name+'</a></li>')
        })
      }
      $compile(element.contents())(scope);
    }
  };
}).directive('leaf', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      leaf: '='
    },
    templateUrl: 'tree/navbar-li.html',
    link: function(scope, element, attrs) {
      var classFound, parent;
      if (angular.isArray(scope.leaf.sub_categories) && ((scope.leaf.sub_categories.length > 0) || (scope.leaf.pages.length > 0))) {
        element.append('<tree tree="leaf"></tree>');
        parent = element.parent();
        classFound = false;
        while (parent.length > 0 && !classFound) {
          if (parent.hasClass('navbar-right')) {
            classFound = true;
          }
          parent = parent.parent();
        }
        if (classFound) {
          element.addClass('dropdown-submenu-right');
        } else {
          element.addClass('dropdown-submenu');
        }
        $compile(element.contents())(scope);
      }
      
    }
  };
});

angular.module('tree/navbar-li.html', []).run([
  '$templateCache', function($templateCache) {
    $templateCache.put('tree/navbar-li.html', '<li ng-class="{divider: leaf.name == \'divider\'}">\n' + '    <a ui-sref="{{leaf.link}}" ng-if="leaf.name !== \'divider\'">{{leaf.name}}</a>\n' + '</li>');
  }
]);

angular.module('tree/navbar-ul.html', []).run([
  '$templateCache', function($templateCache) {
    $templateCache.put('tree/navbar-ul.html', '<ul class=\'dropdown-menu\'>\n' + '    <leaf ng-repeat=\'leaf in tree\' leaf=\'leaf\'></leaf>\n' + '</ul>');
  }
]);

