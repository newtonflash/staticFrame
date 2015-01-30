var path            = require('path');
var express         = require('express');
var bodyParser      = require('body-parser');
var app             = express();
var fs 				= require('fs');
var siteConfig 		= require('./site-config.js');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));

app.set('view engine', 'ejs');

require("./routes")(app, siteConfig, express);

var server = app.listen(3100, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})












