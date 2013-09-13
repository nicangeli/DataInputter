var http = require('http-get');

module.exports = function() {

	this.get = function(url) {
		var options = {
			url: url
		};


		http.get(options, '/path/to/foo.pdf', function (error, result) {
		    if (error) {
		        console.error(error);
		    } else {
		        console.log('File downloaded at: ' + result.file);
		    }
		});

	};

};

