var express = require('express'),
	path = require('path'),
	mime = require('mime'),
	mustacheExpress = require('mustache-express'),
    mailer = require('express-mailer'),
    bodyParser = require("body-parser"),
	app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mailer.extend(
	app,
	{
		host: 'smtp.gmail.com', // hostname 
		secureConnection: true, // use SSL 
		port: 465, // port for secure SMTP 
		transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
		auth: {
			user: 'patrique.ouimet@gmail.com',
			pass: ''
		}
	}
);

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/download-resume', function(req, res){
	var file = __dirname + '/public/downloads/test.txt';
  	res.download(file);
});

app.post('/contact-me', function(req, res){
	app.mailer.send(
	'email',
	{
		to: 'patrique.ouimet@gmail.com', 	// REQUIRED. Comma delimited
		subject: 'Contact Request',			// REQUIRED. 
		requestName: req.body.name,
		requestPhone: req.body.phone,
		requestEmail: req.body.email,
		requestMessage: req.body.message
	},
	function (err) {
		if (err) {
			// handle error 
			console.log(err);
			res.status(500).json({'error':'There was an error sending the email'});
			return;
		}
		res.json({'success':'Email Sent'});
	});
});

app.listen(80, function () {
	console.log('Example app listening on port 80!');
});