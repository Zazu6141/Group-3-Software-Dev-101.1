var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path'),
	busboy = require("then-busboy"),
	fileUpload = require('express-fileupload'),
	app = express(),
	mysql      = require('mysql'),
	bodyParser=require("body-parser");

var connection = mysql.createConnection({
	host     : 'us-cdbr-iron-east-05.cleardb.net',
	user     : 'be627f988962c9',
	password : 'a66b1e98',
	database : 'heroku-4d509a908d16f19'
});

connection.connect();

global.db = connection;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// development only

app.get('/', routes.index);//call for main index page
app.post('/', routes.index);//call for signup post
app.get('/profile/:user_id',routes.profile);//to render users profile
//Middleware
app.listen(3000);
console.log('3000 is the magic port');
