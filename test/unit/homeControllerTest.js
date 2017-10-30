describe('Testing Home Controller', function(){
	var scope, ctrl;
	
	beforeEach(module('budgetApp'));
	beforeEach(inject(function($controller, $rootScope){
			scope = $rootScope.$new();
			ctrl = $controller('mainController', {$scope:scope});
		}));
	
	it('Should initialize name of this month', function() {
		
		var today = new Date();
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		
		expect(scope.thisMonth).toBeDefined();
		expect(scope.thisMonth).toBe(monthNames[today.getMonth()]);
	});
	
	it('Should initialize currency', function(){
		
		expect(scope.currency).toBeDefined();
		expect(scope.currency).toBe('$');
	});
	
	it('Should calculate expenses percentage', function(){
		
		scope.avaliableBudget = {
			income: 10,
			expenses: 5,
			expensesPercentage: 0
		}
		
		expect(scope.avaliableBudget.expensesPercentage).toEqual(0); 
		scope.calculateExpensesPercentage();
		expect(scope.avaliableBudget.expensesPercentage).toEqual(50); 
	});
	
	it('Should calculate avaliable budget form the list data', function(){
		
		scope.avaliableBudget = {
			income: 0,
			expenses: 0,
			expensesPercentage: 0,
			overall: 0
		}
		
		scope.listData = [
			{which: 'inc', amount: 20},
			{which: 'inc', amount: 30},
			{which: 'exp', amount: 10}
		];
		
		scope.calculateBudget();
		scope.calculateExpensesPercentage();
		
		expect(scope.avaliableBudget.income).toEqual(50);
		expect(scope.avaliableBudget.expenses).toEqual(10);
		expect(scope.avaliableBudget.expensesPercentage).toEqual(20);
		expect(scope.avaliableBudget.overall).toEqual(40);
	});
	
	it('Should add income and expenses to listData and update available budget', function(){
		
		// make form validation pass 
		scope.addBudget = {
			$valid: true,
			descriptionText: { $invalid: true },
			amountNum: { $invalid: true }
		}
		
		scope.listData = [
			{which: 'exp', description: 'test1', amount: 10},
			{which: 'exp', description: 'test2', amount: 20},
			{which: 'inc', description: 'test1', amount: 30}
		];
		
		scope.avaliableBudget = {
			income: 0,
			expenses: 0,
			expensesPercentage: 0,
			overall: 0
		}
		
		// add item
		var newItem = {which: 'inc', description: 'test2', amount: 40};
		scope.addBudgetData(newItem);
		
		expect(scope.listData.length).toEqual(4);
		expect(scope.listData[3].which).toBe('inc');
		expect(scope.listData[3].description).toBe('test2');
		expect(scope.listData[3].amount).toEqual(40);
		
		expect(scope.avaliableBudget.income).toEqual(40);
		expect(scope.avaliableBudget.overall).toEqual(40);
		
		// add item
		var newItem = {which: 'exp', description: 'test3', amount: 30};
		scope.addBudgetData(newItem);
		
		expect(scope.listData.length).toEqual(5);
		expect(scope.listData[4].which).toBe('exp');
		expect(scope.listData[4].description).toBe('test3');
		expect(scope.listData[4].amount).toEqual(30);
		
		expect(scope.avaliableBudget.expenses).toEqual(30);
		expect(scope.avaliableBudget.overall).toEqual(10);
	});
	
	it('Should remove item from listData and update available budget', function(){
		
		scope.listData = [
			{which: 'exp', description: 'test1', amount: 10},
			{which: 'exp', description: 'test2', amount: 20},
			{which: 'inc', description: 'test1', amount: 30}
		];
		
		
	});
});