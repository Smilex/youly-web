var express = require("express");
var zoidberg = express.Router();
var auth = require('./auth');
var users = require('./users');

zoidberg.use("/auth", auth.auth);
zoidberg.use("/users", users.users);
zoidberg.route("/")
	//.all(auth.authZoidberg)
	.get(function(req, res, next) {
		var user = {
			name: "The Dude",
			img: "/images/neon/thumb-1@2x.png"
		};
		res.render("zoidberg/index", {user: user}, function (err, html) {
			if (err)
				console.log(err);
			res.send(html);
		});
	});

zoidberg.route("/home")
	//.all(auth.authZoidberg)
	.get(function (req, res) {
	});

zoidberg.route("/home")
	//.all(auth.authZoidberg)
	.get(function (req, res) {
		res.render("zoidberg/home", function (err, html) {
			if (err)
				console.log(err);
			res.send(html);
		});
	});

zoidberg.get("/login", function (req, res) {
		res.render("zoidberg/login", function (err, html) {
			if (err)
				console.log(err);
			res.send(html);
		});
	});

exports.zoidberg = zoidberg;
