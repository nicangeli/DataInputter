// inserter.js

var db = require('mongoskin').db('');

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
