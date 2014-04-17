var express = require("express");
var zoidberg = express.Router();
var auth = require('./auth');
var users = require('./users');

zoidberg.use("/auth", auth.auth);
zoidberg.use("/users", users.users);
zoidberg.route("/")
	.all(auth.authZoidberg)
	.get(function(req, res, next) {
		res.render("zoidberg/index", {user: req.user}, function (err, html) {
			if (err)
				console.log(err);
			res.send(html);
		});
	});

zoidberg.route("/home")
	.all(auth.authZoidberg)
	.get(function (req, res) {
		res.render("zoidberg/home", function (err, html) {
			if (err)
				console.log(err);
			res.send(html);
		});
	});

zoidberg.get("/login", function (req, res) {
		res.sendfile("views/zoidberg/login.html", function (err) {
			if (err)
				console.log(err);
		});
	});

exports.zoidberg = zoidberg;
