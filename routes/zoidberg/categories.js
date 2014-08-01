var categories = require('express').Router();
var auth = require('./auth');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/youly'); 
categories.use(auth.authZoidberg);

categories.get("/parent/:par_id", function (req, res) {
	var categories = db.get("categories");
	categories.find({parent:req.par_id}, function (err, result) {
		if (err) {
			res.status(500).send("");
			return;
		}
		res.set("Content-Type", "application/json");
		res.send(result);
	});
});

categories.post("/insert", function (req, res) {
	var categories = db.get("categories");
	var req_cat = req.body;
	if (!req_cat || !req_cat.name) {
		res.status(400).send("");
		return;
	}
	if (req_cat.parent == "")
		req_cat.parent = null;

	categories.insert({parent: req_cat.parent, name: req_cat.name}, function (err, result) {
		if (err) {
			res.status(500).send("");
			return;
		}
		res.send("");
	});
});

exports.categories = categories;
