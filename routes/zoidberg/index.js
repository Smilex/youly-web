var express = require("express");
var zoidberg = express.Router();
var passport = require("passport")
  , GoogleStrategy = require('passport-google').Strategy;
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/youly');

passport.serializeUser(function(user,done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	var users = db.get('users');
	users.findOne({_id: id}).on('success', function (doc) {
		done(null, doc);
	});
});

passport.use(new GoogleStrategy({
	returnURL: 'http://localhost:4000/zoidberg/auth/google/return',
	realm: 'http://localhost:4000/'
	},
	function(identifier, profile, done) {
		var users = db.get("users");
		users.findOne({openid: identifier})
			.on('success', function (doc) {
				if (doc === null)
				{
					users.insert({openid: identifier})
						.on('success', function (doc) {
							done(null, doc);
						});
				}
				else
				{
					done(null, doc);
				}
			});
	}
));

function authZoidberg(req, res, next) {
	if (!req.user)
	{
		res.redirect("/zoidberg/login");
	}
	else {
		var userssec = db.get('userssec');
		var secgroups = db.get('securitygroups');
		secgroups.findOne({name: "zoidberg"})
			.on("success", function (doc) {
				var zoid_id = doc._id;
				userssec.findOne({user_id: req.user._id, sec_id: zoid_id})
					.on("success", function (doc) {
						if (doc === null)
							res.redirect("/zoidberg/login");
						else
							next();
					});
			});
	}
}

zoidberg.route("/")
	.all(authZoidberg)
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

zoidberg.get("/auth/google", passport.authenticate('google'));
zoidberg.get("/auth/google/return",
	passport.authenticate('google', {successRedirect: "/zoidberg/", failureRedirect: "/zoidberg/login" }));

exports.zoidberg = zoidberg;
