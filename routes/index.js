module.exports = function (app, siteConfig, express){
	app.use("/*", function(req, res){
		var fullUrl = req.originalUrl.substring(1,req.originalUrl.length).split(".html").join("");
		
		if(fullUrl !== "/"){
			res.render(fullUrl, siteConfig);
		}
	});
	 //express.static(__dirname +'/views' + ));

	app.get("/", function(req, res){
		res.render('index', siteConfig);
	});
}