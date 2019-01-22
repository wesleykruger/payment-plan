angular.module('PplnApp.services', [])

  .factory('paymentCalculatorService', function() {
    var payments = [];

    var paymentCalculator = {}

    paymentCalculator.calculate = function(owedAmount, downPayment, numPayments) {
      console.log("owedAmount = " + owedAmount)
      let newOwedAmount = owedAmount - downPayment;
      console.log("in calculator service");
      let installmentAmount = 0;

      if (newOwedAmount > 0) {
        installmentAmount = newOwedAmount / numPayments
      }
      
      console.log(installmentAmount);

      return installmentAmount;
    }

    return paymentCalculator;
  });