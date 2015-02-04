module.exports = function (app, siteConfig, express){
	app.use("/*.html", function(req, res){
		var fullUrl = req.originalUrl.substring(1,req.originalUrl.length).split(".html").join("");
		if(fullUrl !== "/"){
			res.render(fullUrl, siteConfig);
		}
	});
	
	app.get("/", function(req, res){
		res.render('index', siteConfig);
	});

	app.get('*', function(req, res, next) {
	  	var err = new Error();
	  	err.status = 404;
	  	next(err);
	});
	 
	app.use(function(err, req, res, next) {
	  	if(err.status !== 404) {
	    	return next();
	  	}
	  	res.render('404', siteConfig);
	});
}