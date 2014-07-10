var products = require('express').Router();
var auth = require('./auth');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/youly'); 
products.use(auth.authZoidberg);

products.get("/", function (req, res) {
	products = [];
	products.push({
		barcode: "5741000138076",
		name: "Booster Blue",
		brand_name: "Faxe Kondi",
		brand_owner: "Royal Unibrew",
		category: "Drinks > Energy",
		size: "50",
		unit: "cl"
	});
	products.push({
		barcode: "5701614002309",
		name: "SOPI Jardber",
		brand_name: "MBM",
		brand_owner: "MBM",
		category: "Drinks > Jogurt",
		size: "400",
		unit: "ml"
	});
	res.status(200).send(products);
});


products.get("/search/:id", function (req, res) {
	if (req.param("id") == "bc") {
		res.status(200).send([{id:'12561354', desc:'Sopi'},{id:'78425646', desc:'Pepsi'}]);
	}
	else
		res.status(200).send([{id:'ab', desc:'A'},{id:'ba', desc:'B'}]);
});

exports.products = products;
