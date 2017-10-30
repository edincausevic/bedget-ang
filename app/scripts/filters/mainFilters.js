app.filter('textLength', function() {
	
	return function(text, maxLength) {
		
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + '...';
		}else {
			return text;
		}
	}
});