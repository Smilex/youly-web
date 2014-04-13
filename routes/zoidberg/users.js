var users = require('express').Router();
var auth = require('./auth');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/youly'); 
users.use(auth.authZoidberg);

users.get("/", function(req,res) {
	res.render("zoidberg/users", function (err, html) {
		if (err)
			console.log(err);

		res.send(html);
	});
});

users.get("/secgroups", function (req, res) {
	var secgroups = db.get('securitygroups');
	secgroups.find({}).on('success', function (doc) {
		var result = [];
		for (var i = 0; i < doc.length; i++)
		{
			result.push(doc[i].name);
		}
		res.send(result);
	});
});

users.get("/secgroups/:name", function (req, res) {
	var secgroups = db.get('securitygroups');
	var users = db.get('users');
	var u_s = db.get('userssec');

	secgroups.find({name: req.params.name}).on("success", function (doc) {
		for (var i = 0; i < doc.length; i++)
		{
			u_s.find({sec_id: doc[i]._id}).on("success", function (doc) {
				var result = [];
				for (var j = 0; j < doc.length; j++)
				{
					users.findOne({_id: doc[j].user_id}).on("success", function (d) {
						result.push(d.name);
						res.send(result);
					});
				}
			});
		}
	});
});

exports.users = users;
