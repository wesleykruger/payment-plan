angular.module('PplnApp', [
  'PplnApp.controllers',
  'ngRoute'
])
.constant("moment", moment)
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when("/payplan", {templateUrl: "partials/payPlan.html"}).
	otherwise({redirectTo: '/payplan'});
}])
// .directive('percentageField', [ '$filter', function( $filter ) {
//   return {
//       restrict: 'A',
//       require: 'ngModel',
//       scope: {
//           // currencyIncludeDecimals: '&',
          
//       },
//       link: function(scope, element, attr, ngModel) {
          
//           attr[ 'percentageMaxValue' ] = attr[ 'percentageMaxValue' ] || 100;
//           attr[ 'percentageMaxDecimals' ] = attr[ 'percentageMaxDecimals' ] || 2;
          
//           $( element ).css( {'text-align': 'right'} );
          
//           // function called when parsing the inputted url
//           // this validation may not be rfc compliant, but is more
//           // designed to catch common url input issues.
//           function into(input) {
              
//               var valid;
              
//               if( input == '' ) 
//               {
//                   ngModel.$setValidity( 'valid', true );
//                   return '';
//               }
              
//               // if the user enters something that's not even remotely a number, reject it
//               if( ! input.match( /^\d+(\.\d+){0,1}%{0,1}$/gi ) )
//               {                    
//                   ngModel.$setValidity( 'valid', false );
//                   return '';
//               }
              
//               // strip everything but numbers from the input
//               input = input.replace( /[^0-9\.]/gi, '' );
              
//               input = parseFloat( input );
              
//               var power = Math.pow( 10, attr[ 'percentageMaxDecimals' ] );
              
//               input = Math.round( input * power ) / power;
              
//               if( input > attr[ 'percentageMaxValue' ] ) input = attr[ 'percentageMaxValue' ];
              
//               // valid!
//               ngModel.$setValidity( 'valid', true );
              
//               return input;
//           }
          
//           ngModel.$parsers.push(into);
          
//           function out( input )
//           {
//               if( ngModel.$valid && input !== undefined && input > '' )
//               {
//                   return input + '%';
//               }
              
//               return '';
//           }
          
//           ngModel.$formatters.push( out );
          
//           $( element ).bind( 'click', function(){
//               //$( element ).val( ngModel.$modelValue );
//               $( element ).select();
//           });
          
//           $( element ).bind( 'blur', function(){
//               $( element ).val( out( ngModel.$modelValue ) );
//           });
//       }
//   };
// }])
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
})