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

exports.press = function(req, res) {
	res.render('press', {page: "press"}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}

exports.terms_and_conditions = function(req, res) {
	res.render('terms_and_Conditions', {page: "terms_and_Conditions"}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}

exports.privacy_policy = function(req, res) {
	res.render('privacy_policy', {page: "privacy_policy"}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}
