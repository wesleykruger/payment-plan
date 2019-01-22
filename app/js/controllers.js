angular.module('PplnApp.controllers', [])

  /* Payment plan controller */
  .controller('payPlanController', function ($scope, paymentCalculatorService, moment) {
    $scope.paymentArr = [];
    $scope.installmentAmount = 0;

    $scope.doCalculate = function (owedAmount, downPayment, numPayments, firstDate, frequency, calcType, installmentAmount) {
      let installmentArray = [];
      let dateForThisIndex = moment(firstDate).format("MM/DD/YYYY");
      let remainingBal = owedAmount - downPayment;
      if (calcType === 'installmentAmount') {
        console.log("initial remaining Balance: " + remainingBal);
        while (remainingBal > 0) {
          // remainingBal += interestRate;
          if (remainingBal >= installmentAmount) {
            console.log("in standard pay remain = " + remainingBal);
            remainingBal -= installmentAmount;
            installmentArray.push( {
              installmentAmount: installmentAmount,
              date: dateForThisIndex,
              remainingBal: remainingBal
            });
            if (frequency === 'weekly') {
              dateForThisIndex = moment(dateForThisIndex).add(1, 'w').calendar()
            } else {
              dateForThisIndex = moment(dateForThisIndex).add(1, 'M').calendar()
            }
          } else {
            let finalPayment = remainingBal;
            console.log("in final pay remain = " + finalPayment);
            installmentArray.push({
              installmentAmount: finalPayment,
              date: dateForThisIndex,
              remainingBal: 0
            });
            remainingBal = 0;
            console.log("final remainingBal: " + remainingBal);
          }
        }
      } else if (calcType === 'numInstallments') {
        let installmentAmount = paymentCalculatorService.calculate(owedAmount, downPayment, numPayments)
        for (let i = 1; i < numPayments; i++) {
          installmentArray.push({
            installmentAmount: installmentAmount,
            date: dateForThisIndex
          })

          if (frequency === 'weekly') {
            dateForThisIndex = moment(dateForThisIndex).add(1, 'w').calendar()
          } else {
            dateForThisIndex = moment(dateForThisIndex).add(1, 'M').calendar()
          }

        }
      }
      $scope.paymentList = installmentArray
    };

    $scope.paymentArr = [];
    $scope.installmentAmount = 0;

    $scope.master = {};

    $scope.update = function (user) {
      $scope.master = angular.copy(user);
    };

    $scope.reset = function (form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
      $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
  })


