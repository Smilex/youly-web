var express = require("express")
var routes = require("./routes");
var zoidberg = require("./routes/zoidberg").zoidberg;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var stylus = require('stylus');
var uglify = require('express-uglify-middleware');
var bodyParser = require('body-parser');

var app = module.exports = express();

app.use(stylus.middleware({
	src: __dirname + "/resources",
	dest: __dirname + "/public",
	compile: function(str, path) {
		return stylus(str)
			.set('filename', path)
			.set('compress', true);
	}})
);
app.use(uglify({
	src: __dirname + "/resources/js/",
	dest: __dirname + "/public/js/",
	prefix: "/js",
	compressFilter: /\.js$/,
	compress: false
}));
app.set('port', process.env.PORT || 9001);
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'whoop'}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(passport.initialize());
app.use(passport.session());
app.use("/zoidberg", zoidberg);

app.get('/', routes.index);
app.get('/blog', routes.blog);
app.get('/about', routes.about)
app.get('/contact', routes.contact)
app.post('/mail', routes.mail);
app.get('/press', routes.press)
app.get('/legal', routes.terms_and_conditions)
app.get('/privacy', routes.privacy_policy)

var server = app.listen(9001, function() {
	console.log("Listening on port %d", server.address().port);
});
