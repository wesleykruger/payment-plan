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
        while (remainingBal > 0) {
          // remainingBal += interestRate;
          if (remainingBal >= installmentAmount) {
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
            installmentArray.push({
              installmentAmount: finalPayment,
              date: dateForThisIndex,
              remainingBal: 0
            });
            remainingBal = 0;
          }
        }
      } else if (calcType === 'numInstallments') {
        let newOwedAmount = owedAmount - downPayment;
        let installmentAmount = 0;


        // This is not accurate enough for production. This truncate decimals to match currency format, so a straight divide is not accurate enough.
        // There is also interest to consider
        if (newOwedAmount > 0) {
          installmentAmount = newOwedAmount / numPayments
        }


        for (let i = 1; i < numPayments; i++) {
          installmentArray.push({
            installmentAmount: installmentAmount,
            date: dateForThisIndex,
            remainingBal: 0
          })

          if (frequency === 'weekly') {
            console.log(dateForThisIndex)
            dateForThisIndex = moment(moment(dateForThisIndex).add(1, 'w').calendar()).format("MM/DD/YYYY");
          } else {
            dateForThisIndex = moment(moment(dateForThisIndex).add(1, 'M').calendar()).format("MM/DD/YYYY");
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


