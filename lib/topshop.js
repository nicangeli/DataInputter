var $ = require('cheerio'),
	_ = require('underscore'),
	request = require('request'),
	fs = require('fs');

module.exports = function() {
	this.get = function(url, callback) {
		url = url.trim();
		var head = {};
		head.url = url;
		head.headers = {
			'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X; de-de) AppleWebKit/523.10.3 (KHTML, like Gecko) Version/3.0.4 Safari/523.10',
			'Host': 'www.topshop.com',
			'Accept-Charset': 'ISO-8859-1,UTF-8;q=0.7,*;q=0.7'
		};
		request(head, function(err, res, html) {
			if(err) {
				throw err;
			}
			console.log(res.statusCode);

			var parsedHtml = $.load(html);

			var title, price, brand, shop, type, imageUrl;
			console.log(parsedHtml);

			parsedHtml('h1').each(function(i, text) {
				title = $(text).text();
			});

			parsedHtml('.product_price span').each(function(i, text) {
				price = $(text).text();
			});

			parsedHtml('h1').each(function(i, text) {
				brand = $(text).text().split('BY')[1];
				if(brand == undefined) {
					brand = "Topshop";
				}
			});

			shop = "Topshop";

			parsedHtml('#nav_breadcrumb li:nth-child(3) span').each(function(i, text) {
				type = $(text).text();
			});

			parsedHtml(".product_view").each(function(i, text) {
				imageUrl = $(text).attr("href");
			});

			var data = {
				"title": title, 
				"price": price,
				"brand": brand,
				"shop": shop,
				"type": type,
				"imageUrl": imageUrl
			};
			callback(data);
		});
	}
}