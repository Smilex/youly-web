exports.index = function(req, res) {
	res.render('index', {user: req.user}, function(err, html) {
		if (err)
			console.log(err);
		res.send(html);
	});
}
