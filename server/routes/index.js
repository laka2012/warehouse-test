'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var PER_PAGE = 12;
var DATA = path.join(__dirname, '/../../public', 'test.json');

function getPagingItems(items, page, limit) {
	return items.slice((page - 1) * limit, page * limit);
}

router.get('/products', function(req, res){
	var items = JSON.parse(fs.readFileSync(DATA));

	var page = req.query.page || 1;
	var limit = req.query.limit || PER_PAGE;
	var searchText = req.query.searchtext || '';
	var category = req.query.category || '';

	//TODO filter search text
	if (searchText) {
		items = items.filter((item) => (item.name && item.name.match(new RegExp(searchText, "i"))) 
			|| (item.brand && item.brand.match(new RegExp(searchText, "i"))));
	}

	//TODO filter cateory
	if (category) {
		items = items.filter((item) => item.categories == decodeURIComponent(category) || category == '')
	}

	var meta = {
		page: page,
		limit: limit,
		total_count: items.length,
	};

	var json = {
		meta: meta,
		products: getPagingItems(items, page, limit),
	};

	return res.json(json);
});

module.exports = router;