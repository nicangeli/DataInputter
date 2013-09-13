var AsosScraper = require('../lib/asos.js'),
	Router = require('../lib/router.js'),
	async = require('async'),
	Product = require('../lib/Product.js');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.insert = function(req, res) {
	var urls = req.body.urls;

	var r = new Router();
	r.route(urls, function(objects) {
		res.render('details', {data: objects});
	});

};

exports.save = function(req, res) {
	var numOfItems = req.body.num,
		indexes = [];
	for(var i = 0; i < numOfItems; i++) {
		indexes.push(i);
	} 
	async.forEach(indexes, function(i, callback) {
		var title = req.body['title' + i],
			price = req.body['price' + i],
			brand = req.body['brand' + i],
			shop = req.body['shop' + i],
			type = req.body['type' + i],
			url = req.body['url' + i],
			imageUrl = req.body['imageUrl' + i],
			tags = req.body['tags' + i],
			comment = req.body['comment' + i],
			collection = req.body['collection' + i];

		tags = tags.split(','); // tags were comma seperated, now array
		for(var j = 0; j < tags.length; j++) {
			tags[j] = tags[j].trim();
		}

		var p = new Product();
		p.save({
			"title": title,
			"price": price,
			"brand": brand,
			"shop": shop,
			"type": type,
			"url": url,
			"imageUrl": imageUrl,
			"tags": tags,
			"comment": comment
		}, collection, function() {
			callback();
		})

	}, function(err) {
		// when done do this
		if(err)
			throw err;
		res.redirect('/');
	});
}