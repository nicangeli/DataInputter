// inserter.js

var db = require('mongoskin').db('mongodb://nodescript:nodescript@ds045938.mongolab.com:45938/heroku_app18114381');

module.exports = function() {
	
	this.save = function(o, collectionName, callback) {
		db.collection(collectionName).insert(o, function(err, result) {
			if(err)
				throw err;
			if(result) {
				console.log('Added product to ' + collectionName);
				callback();
			}
		})
	}

}