describe('Testing filters', function(){
	
	describe('FILTER: textLength', function(){ 
		var $filter;

		beforeEach(function () {
			module('budgetApp');

			inject(function (_$filter_) {
			  $filter = _$filter_;
			});
		});

		it('Should cut out long string after certain number of characters and put three dots on the end', function() {

			var string = 'Testing AngularJS';

			var result = $filter('textLength')(string, '4');
			expect(result).toBe('Test...');

			var result = $filter('textLength')(string, '2');
			expect(result).toBe('Te...');
		});
	});
});