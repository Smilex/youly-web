var passport = require("passport")
  , GoogleStrategy = require('passport-google').Strategy;
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/youly');
var auth = require("express").Router();

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
		console.log(profile);
		users.findOne({openid: identifier})
			.on('success', function (doc) {
				if (doc === null)
				{
					users.insert({openid: identifier, name: profile.displayName})
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

exports.authZoidberg = function (req, res, next) {
	console.log(req.user)
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

auth.get("/google", passport.authenticate('google'));
auth.get("/google/return",
	passport.authenticate('google', {successRedirect: "/zoidberg/", failureRedirect: "/zoidberg/login" }));

exports.auth = auth;
