var blogs = require('express').Router();
var auth = require('./auth');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/youly'); 
blogs.use(auth.authZoidberg);

blogs.get("/", function (req, res) {
	var blogs = db.get("blogs");
	blogs.find({}, function (err, doc) {
		if (err) {
			res.status(500).send("");
			return;
		}

		var users = db.get("users");
		users.find({}, function (err, user) {
			if (err) {
				res.status(500).send("");
				return;
			}
			var authors = [];
			for (var i = 0; i < user.length; i++)
				authors.push({id: user[i]._id, name: user[i].username});
			for (var i = 0; i < doc.length; i++) {
				for (var j = 0; j < authors.length; j++) {
					if (doc[i].author.toString() == authors[j].id.toString()) {
						doc[i].author = authors[j].name;
					}
				}
			}

			res.send(doc);
		});
	});
});

blogs.post("/publish", function (req, res) {
	var blogs = db.get("blogs");
	var req_blog = req.body;
	if (!req_blog || req_blog.id == null || req_blog.published == null) {
		res.status(400).send("");
		return;
	}
	var date = new Date();
	var monthNames = [ "January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December" ];
	var dd = date.getDate();
	var mm = date.getMonth();
	var yyyy = date.getFullYear();
	if (dd<10)
		dd='0'+dd;
	date = dd + ' ' + monthNames[mm] + ', ' + yyyy;
	blogs.update({_id: req_blog.id},
	   	{
			$set: {
				published: req_blog.published,
				date: date
			}
		})
		.on("success", function () {
			res.status(202).send("");
		})
		.on("error", function () {
			res.status(500).send("");
		});

});

blogs.post("/new", function (req, res) {
	var blogs = db.get("blogs");
	var users = db.get("users");
	blogs.insert({author: req.user._id}, function (err, blog) {
		if (err) {
			res.status(500).send("");
			return;
		}
		blog.author = req.user.username;
		res.send(blog);
	});
});

blogs.post("/delete", function (req, res) {
	var blogs = db.get("blogs");
	blogs.remove({_id: req.body.id}, function (err, blog) {
		if (err) {
			res.status(500).send("");
		}
		res.send("");
	});
});

blogs.post("/save", function (req, res) {
	var req_blog = req.body;
	if (!req_blog || req_blog._id == null) {
		res.status(300).send("");
		return;
	}
	var blogs = db.get("blogs");
	blogs.update({_id: req_blog._id},
		{
			$set:
			{
				title: req_blog.title,
				content: req_blog.content
			}
		},
		function (err, blog) {
			if (err) {
				res.status(400).send("");
				return;
			}

			res.status(200).send("");
		});
});

exports.blogs = blogs;
