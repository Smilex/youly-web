var express = require("express")
var routes = require("./routes");
var zoidberg = require("./routes/zoidberg").zoidberg;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var app = module.exports = express();

app.set('port', process.env.PORT || 4000);
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(session({secret: 'whoop'}));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
app.use("/zoidberg", zoidberg);

app.get('/', routes.index);

var server = app.listen(4000, function() {
	console.log("Listening on port %d", server.address().port);
});
