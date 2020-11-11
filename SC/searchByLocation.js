module.exports = function(){

    var express = require('express');
    var router = express.Router();
    
    router.post('/', function(req, res){
        context = {}
        var mysql = req.app.get('mysql');
        var sql = "SELECT maxOffense AS 'offense', MAX(totalOffenses.mycount) AS 'total' FROM (SELECT offenses.name maxOffense, count(offenses.offenseID) mycount FROM offenses INNER JOIN incidentsOffenses ON offenses.offenseID = incidentsOffenses.offenseID INNER JOIN incidents ON incidentsOffenses.incidentID = incidents.incidentID WHERE incidents.city =? GROUP BY offenses.offenseID) as totalOffenses"
        var insert =[req.body.incident_city]
        mysql.pool.query(sql, insert, function(err, results, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }else{
                context.incidents = results;
                console.log(context);
                res.render('searchByLocationSubmitted', context);

            }
        });

    });

        router.get('/', function(req, res){

            res.render("searchByLocation")
        });




    return router;
}();