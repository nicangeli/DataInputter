var $ = require('cheerio'),
	_ = require('underscore'),
	request = require('request'),
	fs = require('fs');


module.exports = function() {

	this.get = function(url, callback) {

		request(url, function(err, res, html) {
			if(err)
				throw err;
			
			var parsedHtml = $.load(html);

			var title, price, brand, shop, type, imageUrl;

			parsedHtml('#ctl00_ContentMainPage_ctlSeparateProduct_lblProductTitle').each(function(i, text) {
				title = $(text).text();
			});

			parsedHtml('#ctl00_ContentMainPage_ctlSeparateProduct_lblProductPrice').each(function(i, text) {
				price = $(text).text();
			});

			parsedHtml('a:nth-child(2) strong').each(function(i, text) {
				brand = $(text).text();
			});

			shop = "ASOS";

			parsedHtml('#ctl00_ContentMainPage_ctlSeparateProduct_divInvLongDescription a:nth-child(1) strong').each(function(i, text) {
				type = $(text).text();
			});

			parsedHtml('#ctl00_ContentMainPage_imgMainImage').each(function(i, text) {
				imageUrl = $(text).attr('src');
			})

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