angular.module('PplnApp.controllers', [])

  /* Payment plan controller */
  .controller('payPlanController', function ($scope, paymentCalculatorService, moment) {
    $scope.paymentArr = [];
    $scope.installmentAmount = 0;

    $scope.doCalculate = function (stringOwedAmount, stringDownPayment, numPayments, firstDate, frequency, calcType, stringInstallmentAmount) {
      let installmentArray = [];
      let owedAmount = parseFloat(stringOwedAmount);
      let downPayment = parseFloat(stringDownPayment);
      let installmentAmount = parseFloat(stringInstallmentAmount);
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
              dateForThisIndex = moment(moment(dateForThisIndex).add(1, 'w')).format("MM/DD/YYYY");
            } else {
              dateForThisIndex = moment(moment(dateForThisIndex).add(1, 'M')).format("MM/DD/YYYY");
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

        let remainingBal = newOwedAmount
        for (let i = 0; i < numPayments; i++) {
          remainingBal -= installmentAmount;
          installmentArray.push({
            installmentAmount: installmentAmount,
            date: dateForThisIndex,
            remainingBal: remainingBal
          })

          if (frequency === 'weekly') {
            console.log(dateForThisIndex)
            dateForThisIndex = moment(moment(dateForThisIndex).add(1, 'w')).format("MM/DD/YYYY");
          } else {
            dateForThisIndex = moment(moment(dateForThisIndex).add(1, 'M')).format("MM/DD/YYYY");
          }

        }
      }
      $scope.paymentList = installmentArray
    };
  })


