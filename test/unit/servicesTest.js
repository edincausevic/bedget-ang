describe('Testing Services', function(){
	
	describe('SERVICE: CommonServices', function(){
		
		var $service;

		beforeEach(function () {
			module('budgetApp');

			inject(function (_CommonServices_) {
			  $service = _CommonServices_;
			});
		});
		
		it('Should return month name', function(){
			
			var thisMonth = new Date().getMonth();
			var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			
			
			expect($service.getMonth()).toBeDefined();
			expect($service.getMonth()).toBe(monthNames[thisMonth]);
		});
	});
});