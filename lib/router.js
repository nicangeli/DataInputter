// router file, takes comma seperated string of URLS and sends // them off to the correct store

var async = require('async'),
	AsosParser = require('./asos.js');

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

module.exports = function() {

	this.route = function(urls, myCallback) {

		var myUrls = urls.split(','),
			objects = [];

		async.forEach(myUrls, function(url, callback) {
			var parts = url.split('://www.');
				store = parts[1].toUpperCase();
				if(store.startsWith("ASOS")) {
					var a = new AsosParser();
					a.get(url, function(details) {
						details.url = url;
						objects.push(details);
						callback();
					});
				}
		}, function(err) {
			myCallback(objects);
		});



	}
	
} 