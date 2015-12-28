var path            = require('path');
var express         = require('express');
var bodyParser      = require('body-parser');
var app             = express();
var fs 				= require('fs');
var siteConfig 		= require('./site-config.js');

var serveIndex      = require('serve-index');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/services')));
app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/components', serveIndex('views/components/', {'icons': true}));

app.engine('.html', require('ejs').__express);
app.set('view engine', siteConfig.templateEngine);



require("./core/routes")(app, siteConfig, express);

var server = app.listen(siteConfig.portNo, function () {
    var host = server.address().address;
    var port = server.address().port;
console.log('StaticFrame app listening at http://%s:%s', host, port);

});












