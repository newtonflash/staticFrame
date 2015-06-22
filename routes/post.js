module.exports = function (app, siteConfig, express){
    app.post("/test.json", function(req, res){
        res.send({
            "a":5
        });
    });
};