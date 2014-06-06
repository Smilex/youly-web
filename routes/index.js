var mail = require("./mail");
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/youly'); 

exports.mail = mail.mail;
exports.index = function(req, res) {
	res.render('index', {page: "home"}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}

exports.blog = function(req, res) {
	var blogs = db.get('blogs');

	blogs.find().on("success", function (doc) {
		res.render('blog', {blogs: doc, page: "blog"}, function(err, html) {
			if (err)
				console.log(err);
			res.send(html);
		});
	});
}

exports.about = function(req, res) {
	res.render('about', {page: "about"}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}

exports.contact = function(req, res) {
	res.render('contact', {page: "contact"}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}

exports.test101 = function(req, res) {
	res.render('test101', {page: "test101"}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}
