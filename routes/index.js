var mail = require("./mail");
exports.mail = mail.mail;
exports.index = function(req, res) {
	res.render('index', {page: "home"}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}

exports.blog = function(req, res) {

	var blogs = [
		{title: "Title 1", content: "Content 1"},
		{title: "Title 2", content: "Content 2"},
		{title: "Title 3", content: "Content 3"}
	];

	res.render('blog', {blogs: blogs, page: "blog"}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
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

exports.download = function(req, res) {
	var p = req.params.p;
	if (p == "android")
		res.download("public/app/Youly.apk");
	else
		res.redirect("/");
}
