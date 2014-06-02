var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP", {
	service: "Gmail",
	auth: {
		user: "ian@youly.dk",
		pass: "you159951ly"
	}
});

var mailOptions = {
	to: "ian@youly.dk, hanus@youly.dk, tummas@youly.dk"
};

exports.mail = function(req, res) {
	if (req.body && req.body.email && req.body.name &&
			req.body.subject && req.body.message) {
		mailOptions.from = req.body.name + " <" + req.body.email + ">";
		mailOptions.subject = req.body.subject;
		mailOptions.text = req.body.message;
		smtpTransport.sendMail(mailOptions);
	}

	res.end("");
}
