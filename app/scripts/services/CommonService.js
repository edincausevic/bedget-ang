app.service('CommonServices', function(){
	

	this.today = new Date(),
	this.date = {
		year: this.today.getFullYear(),
		month: this.today.getMonth(),
		day: this.today.getDate(),
		fullTime: this.today.toLocaleTimeString() 
	},
	this.todayDateAndTime = function() {
		return this.date.day +'/'+ this.date.month +'/'+ this.date.year +' -  '+ this.date.fullTime;	
	},	
	this.getMonth = function() {
		
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return monthNames[this.date.month];
	},
	this.currencies = { us: '$', bih: 'KM'}
});