angular.module('PplnApp.controllers', [])

  /* Payment plan controller */
  .controller('payPlanController', function ($scope, moment) {
    $scope.paymentArr = [];
    $scope.installmentAmount = 0;

    $scope.doCalculate = function (stringOwedAmount, stringDownPayment, numPayments, firstDate, frequency, calcType, stringInstallmentAmount, interestRateRaw) {
      let installmentArray = [];
      let owedAmount = parseFloat(stringOwedAmount);
      let downPayment = parseFloat(stringDownPayment);
      let installmentAmount = parseFloat(stringInstallmentAmount);
      let dateForThisIndex = moment(firstDate).format("MM/DD/YYYY");
      let remainingBal = owedAmount - downPayment;
      let startingBal = 0;
      let interestRate = 0;

      if (frequency === 'weekly') {
        interestRate = (interestRateRaw / 100) / 52
      } else {
        interestRate = (interestRateRaw / 100) / 12

      }

      if (calcType === 'installmentAmount') {
        while (remainingBal > 0) {
          startingBal = (remainingBal * interestRate) + remainingBal;
          if (startingBal >= installmentAmount) {
            remainingBal = startingBal - installmentAmount;
            installmentArray.push({
              installmentAmount: installmentAmount,
              date: dateForThisIndex,
              startingBal: startingBal,
              remainingBal: remainingBal
            });
            if (frequency === 'weekly') {
              dateForThisIndex = moment(moment(dateForThisIndex).add(1, 'w')).format("MM/DD/YYYY");
            } else {
              dateForThisIndex = moment(moment(dateForThisIndex).add(1, 'M')).format("MM/DD/YYYY");
            }
          } else {
            let finalPayment = startingBal;
            installmentArray.push({
              installmentAmount: finalPayment,
              date: dateForThisIndex,
              startingBal: startingBal,
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

        let remainingBal = newOwedAmount
        for (let i = 0; i < numPayments; i++) {
          startingBal = (remainingBal * interestRate) + remainingBal;
          remainingBal -= installmentAmount;
          installmentArray.push({
            installmentAmount: installmentAmount,
            date: dateForThisIndex,
            remainingBal: remainingBal,
            startingBal: startingBal
          })

          if (frequency === 'weekly') {
            dateForThisIndex = moment(moment(dateForThisIndex).add(1, 'w')).format("MM/DD/YYYY");
          } else {
            dateForThisIndex = moment(moment(dateForThisIndex).add(1, 'M')).format("MM/DD/YYYY");
          }

        }
      }
      $scope.paymentList = installmentArray
    };
  })
