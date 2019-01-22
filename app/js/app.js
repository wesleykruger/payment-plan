angular.module('PplnApp', [
  'PplnApp.services',
  'PplnApp.controllers',
  'ngRoute'
  // require('angular-animate'),
  // 'moment'
])
.constant("moment", moment)
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when("/payplan", {templateUrl: "partials/payPlan.html"}).
	otherwise({redirectTo: '/payplan'});
}])
.directive('formatToCurrency', function($filter){
  return {
    scope: {
      amount  : '='
    },
    link: function(scope, el, attrs){
      el.val($filter('currency')(scope.amount));
      
      el.bind('focus', function(){
        el.val(scope.amount);
      });
      
      el.bind('input', function(){
        scope.amount = el.val();
        scope.$apply();
      });
      
      el.bind('blur', function(){
        el.val($filter('currency')(scope.amount));
      });
    }
  }
});;