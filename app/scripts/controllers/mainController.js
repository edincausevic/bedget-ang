app.controller('mainController', ['$scope', 'CommonServices', '$timeout', function($scope, CommonServices, $timeout){
	
	// set month
	$scope.thisMonth = CommonServices.getMonth();
	// set select initial value to remove empty option	
	$scope.addData = { which : 'inc' }
	// set valute 
	$scope.currency = CommonServices.currencies.us;
	
	$scope.listData = [
		{which: 'inc', description: 'test1', amount: 2, date: '21/3/1987 - 08:25:24 PM'},
		{which: 'inc', description: 'test2', amount: 1, date: '21/3/1987 - 08:25:24 PM'},
		{which: 'exp', description: 'test2', amount: 1, date: '21/3/1987 - 08:25:24 PM'},
		{which: 'exp', description: 'test1', amount: 1, date: '21/3/1987 - 08:25:24 PM'},
		{which: 'inc', description: 'test2', amount: 1, date: '21/3/1987 - 08:25:24 PM'},
		{which: 'exp', description: 'test2', amount: 1, date: '21/3/1987 - 08:25:24 PM'}
	];
	
	// AVAILABLE BUDGET DISPLAY DATA
	$scope.avaliableBudget = {
		income: 0,
		expenses: 0,
		expensesPercentage: 0,
		overall: 0
	}
	
	$scope.calculateExpensesPercentage = function() {
		$scope.avaliableBudget.expensesPercentage =  Math.floor(($scope.avaliableBudget.expenses / $scope.avaliableBudget.income) * 100);
	}

	// CALCULATE BUDGET FROM LIST DATA
	$scope.calculateBudget = function() {
		var income = 0;
		var expenses = 0;
		
		angular.forEach($scope.listData, function(item){
			
			if (item.which === 'inc') { income += item.amount; }
			if (item.which === 'exp') { expenses += item.amount; }
		});
		
		// display available budget
		$scope.avaliableBudget.income = income;
		$scope.avaliableBudget.expenses = expenses;
		$scope.avaliableBudget.overall = income - expenses;
		$scope.calculateExpensesPercentage();
	}
	$scope.calculateBudget();
	
	
	// ADD INCOME AND EXPENSES - btn Add
	$scope.addBudgetData = function(addData) {
		
		var item = {
			which: addData.which,
			description: addData.description,
			amount: addData.amount,
			date: CommonServices.todayDateAndTime()
		};
		
		if($scope.addBudget.$valid) {
			
			// add item to the list
			$scope.listData.push(item); 
			
			// calculate money 
			if (item.which === 'inc') {
				
				$scope.avaliableBudget.income = $scope.avaliableBudget.income + item.amount;
				$scope.avaliableBudget.overall = $scope.avaliableBudget.overall + item.amount;
			}else {
				
				$scope.avaliableBudget.expenses = $scope.avaliableBudget.expenses + item.amount;
				$scope.avaliableBudget.overall = $scope.avaliableBudget.overall - item.amount;
			}
			$scope.calculateExpensesPercentage();
			
		}else {
			console.log('not valid')
		}

		// FORM VALIDATION
		// check if inputs are valid and empty add budget from inputs
		if ($scope.addBudget.descriptionText.$invalid) {
			$scope.descriptionEempty = true;
		}
		if ($scope.addBudget.amountNum.$invalid) {
			$scope.amountEempty = true;  
		}
		if ($scope.addBudget.descriptionText.$valid && $scope.addBudget.amountNum.$valid) {
			$scope.addData.description = "";
			$scope.addData.amount = "";
			$scope.amountEempty = false; 
			$scope.descriptionEempty = false;
		}
		
		//document.getElementById('description').focus();
	}
	
	// REMOVE ITEM FROM LIST
	$scope.removeItem = function(item) {
		
		if (confirm('Are you shure you want to remove ' + item.description)) {
			
			// remove item
			$scope.listData.splice($scope.listData.indexOf(item), 1);
			
			// update diplay money
			if (item.which === 'inc') {
				
				$scope.avaliableBudget.income = $scope.avaliableBudget.income - item.amount;
				$scope.avaliableBudget.overall = $scope.avaliableBudget.overall - item.amount;
				
			}else if (item.which === 'exp') {
				
				$scope.avaliableBudget.expenses = $scope.avaliableBudget.expenses - item.amount;
				$scope.avaliableBudget.overall = $scope.avaliableBudget.overall + item.amount;
			}
			$scope.calculateExpensesPercentage();
		}
		
	}
}]);
















