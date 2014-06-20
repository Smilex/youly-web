var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/youly');
var auth = require("express").Router();
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	var users = db.get('users');
	users.findOne({_id: id}, function(err, user) {
		done(err, user);
	});
});

passport.use(new localStrategy (
	function (username, password, done) {
		var users = db.get('users');
		users.findOne({username: username}, function (err, user) {
			if (err)
				return done(err);
			if (!user)
				return done(null, false, {message: "Incorrect username."});
			if (user.password != password)
				return done(null, false, {message: "Incorrect password."});

			return done(null, user);
		});
	}
));

exports.authZoidberg = function (req, res, next) {
	console.log(req.user);
	if (!req.user)
	{
		res.redirect("/zoidberg/login");
	}
	else {
		var users = db.get('users');
		users.findOne({username: req.user.username,
			password: req.user.password},
			function (err, user) {
				console.log(err);
				if (err)
					res.redirect("/zoidberg/login");
				console.log(user);
				if (!user)
					res.redirect("/zoidberg/login");
				next();
			}
		);
	}
}

auth.post("/", passport.authenticate("local", {
	successRedirect: "/zoidberg",
	failureRedirect: "/zoidberg/login"
}));

exports.auth = auth;
