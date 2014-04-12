var express = require("express");
var zoidberg = express.Router();
var auth = require('./auth');

zoidberg.use("/auth", auth.auth);
zoidberg.route("/")
	.all(auth.authZoidberg)
	.get(function(req, res, next) {
		res.render("zoidberg/index.jade", {user: req.user}, function (err, html) {
			if (err)
				console.log(err);
			res.send(html);
		});
	});

zoidberg.get("/login", function (req, res) {
		res.render("zoidberg/login.jade", function (err, html) {
			if (err)
				console.log(err);
			res.send(html);
		});
	});

exports.zoidberg = zoidberg;
