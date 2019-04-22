'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Shopping App Api', function () {
	it('/products GET with paging', function (done) {
		chai.request(server)
			.get('/products?page=2')
			.end(function (err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.products.should.be.a('array');
				res.body.products.length.should.equal(12);
				res.body.meta.page.should.equal('2');
				done();
			});
	});

	it('/products GET with search text', function (done) {
		chai.request(server)
			.get('/products?page=2&searchtext=hp')
			.end(function (err, res) {
				res.should.have.status(200);
				res.body.products.should.be.a('array');
				res.body.products.length.should.equal(12);
				res.body.meta.page.should.equal('2');
				done();
			});
	});

	it('/products GET with category', function (done) {
		chai.request(server)
			.get('/products?page=1&category=Computers%2520%26%2520Tablets%7CPrinters%7CInk%2C%2520Toner%2520%26%2520Paper')
			.end(function (err, res) {
				res.should.have.status(200);
				res.body.products.should.be.a('array');
				res.body.products.length.should.equal(12);
				res.body.meta.page.should.equal('1');
				done();
			});
	})
});