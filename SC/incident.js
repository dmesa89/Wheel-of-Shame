module.exports = function(){

    var express = require('express');
    var router = express.Router();

    function getIncidentReport(res, mysql, context, done){
        mysql.pool.query("SELECT * FROM evidence", function(err, result, fields){
            if(err){ 
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            
            context.incidents = result;
            done();
        });
    }


    router.post('/', function(req, res){
        
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO `vehicles` (`licensePlate`, `make`, `model`, `color`) VALUES (?, ?, ?,?);";
        var anOffense = req.body.offense;
        var description = req.body.description;
        var insert =[req.body.license_plate_num, req.body.vehicle_make, req.body.vehicle_model, req.body.vehicle_color];
        sql = mysql.pool.query(sql, insert, function(err, results, fields){
            if(err){
                if(res.code = "ER_DUP_ENTRY"){
                    submitIncident();
                }else{
                    res.write(JSON.stringify(err));
                    res.end();
                }
                
            }else{
                submitIncident();
                

            }
        });

        function submitIncident() {
            sql = "INSERT INTO `incidents` (`city`, `state`, `date`, `licensePlate`) VALUES (?, ?,?,?); SELECT LAST_INSERT_ID() AS 'ID';"
            insert = [req.body.city, req.body.state, req.body.date, req.body.license_plate_num]
            sql = sql = mysql.pool.query(sql, insert, function(err, results, fields){
                if(err){
                    res.write(JSON.stringify(err));
                    res.end();
                }else{
                    var anID = results[1][0]['ID'];
                    var done = 0;
                    for (var i =0; i < anOffense.length; i++){
                        submitIncidentOffenses(anOffense[i], anID);
                        done++;
                    }
                    if(done >= anOffense.length){
                        submitEvidence(anID);
                    }
                   
                }
            });
        };

        function submitIncidentOffenses(element, lastID) {
            sql = "INSERT INTO `incidentsOffenses` (`incidentID`, `offenseID`) VALUES (?, ?);";
            insert = [lastID, element];
            sql= mysql.pool.query(sql, insert, function(err, results, fields){
                if(err){
                    res.write(JSON.stringify(err));
                    res.end();
                }else{
                    return;
                }
            });
        };

        function submitEvidence(lastID) {
            sql = "INSERT INTO `evidence` (`description`, `incidentID`) VALUES (?, ?);";
            insert = [description, lastID];
            sql = sql = mysql.pool.query(sql,insert, function(err, results, fields){
                if(err){
                    res.write(JSON.stringify(err));
                    res.end();
                }else{
                    res.redirect('/incident');
                }
            });
        };



    });

    
    

    router.get('/', function(req, res){
        var context = {};
        context.jsscripts = ["addOffenseOption.js"]
        res.render("incident", context);
    });




    return router;
}();