// router file, takes comma seperated string of URLS and sends // them off to the correct store

var async = require('async'),
	AsosParser = require('./asos.js'),
	TopShopParser = require('./topshop.js'),
	NastyGalParser = require('./nasty-gal.js');

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
			var parts = url.split('://');
				store = parts[1].toUpperCase();
				if(store.startsWith("ASOS") || store.startsWith("WWW.ASOS")) {
					var a = new AsosParser();
					a.get(url, function(details) {
						details.url = url;
						objects.push(details);
						callback();
					});
				} else if(store.startsWith("TOPSHOP") || store.startsWith("WWW.TOPSHOP")) {
					console.log('using topshop parser')
					var t = new TopShopParser();
					t.get(url, function(details) {
						details.url = url;
						objects.push(details);
						callback();
					});
				} else if(store.startsWith("NASTYGAL") || store.startsWith("WWW.NASTYGAL")) {
					var ng = new NastyGalParser();
					ng.get(url, function(details) {
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