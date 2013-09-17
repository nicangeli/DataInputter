var $ = require('cheerio'),
	_ = require('underscore'),
	request = require('request'),
	jar = request.jar(),
	fs = require('fs');


module.exports = function() {

	this.get = function(url, callback) {
		//http://www.nastygal.com/index.cfm/fuseaction/localization.setPrefs/locale/gbp/isotwolettercountrycode/gb

		var cookie = request.cookie("CURRENCYPREFERENCE=gbp");
		jar.add(cookie);
		request({
			uri: url,
			method: "GET",
			jar: jar
		}, function(err, res, html) {
			if(err)
				throw err;
			
			var parsedHtml = $.load(html);

			var title, price, brand, shop, type, imageUrl;

			parsedHtml('h1').each(function(i, text) {
				title = $(text).text();
			});

			parsedHtml('.price span').each(function(i, text) {
				price = $(text).text();
			});

			brand = "Nasty Gal";

			shop = "Nasty Gal";

			parsedHtml('#breadcrumbs li:nth-child(3) .txt').each(function(i, text) {
				type = $(text).text();
			});

			$($(".hoverzoom").children()[0]).attr('src')
			parsedHtml('.hoverzoom').each(function(i, text) {
				imageUrl = $($(text).children()[0]).attr('src');
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