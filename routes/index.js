exports.index = function(req, res) {
	console.log(req);
	res.render('index', function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}

exports.blog = function(req, res) {
	console.log(req);

	var blogs = [
		{title: "Title 1", content: "Content 1"},
		{title: "Title 2", content: "Content 2"},
		{title: "Title 3", content: "Content 3"}
	];

	res.render('blog', {blogs: blogs}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}

exports.about = function(req, res) {
	console.log(req);
	res.render('about', function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}

exports.contact = function(req, res) {
	console.log(req);
	res.render('contact', function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}
