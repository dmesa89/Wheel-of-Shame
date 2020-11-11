module.exports = function(){

    var express = require('express');
    var router = express.Router();




    
    router.post('/', function(req, res){
        var callbackCount = 0;
        var context = {}
        context.jsscripts = ["deleteIncident.js"];
        var mysql = req.app.get('mysql');
        var licensePlate = req.body.license_plate_num
        var sql = "SELECT GROUP_CONCAT(offenses.name) as offenses, incidents.city, incidents.state, incidents.date, evidence.description, incidents.incidentID, vehicles.licensePlate FROM incidents INNER JOIN incidentsOffenses ON incidents.incidentID = incidentsOffenses.incidentID INNER JOIN offenses ON incidentsOffenses.offenseID = offenses.offenseID INNER JOIN evidence ON incidents.incidentID =  evidence.incidentID INNER JOIN vehicles ON incidents.licensePlate = vehicles.licensePlate WHERE vehicles.licensePlate=? GROUP BY incidents.incidentID"
        var insert =[licensePlate];
        mysql.pool.query(sql, insert, function(err, results, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }else{
                context.incidents = results;
                getVehicle(mysql, licensePlate, context,done);
                function done(){
                    callbackCount++;
                    if(callbackCount >= 1){
                        res.render('submitted', context);;
                        
                    }
                }
              
            

            }
        });

        function addOffenses(){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO `incidentsOffenses` (`incidentID`, `offenseID`) VALUES (?, ?);";
            var inserts = [req.params.id, req.body.offense];
            sql = mysql.pool.query(sql,inserts,function(err, result, fields){
                if(err){
                    console.log(err)
                    res.write(JSON.stringify(err));
                    res.end();
                }else{
                    return;
                   
                }
            });
            
        };


    });

    function getVehicle(mysql,licensePlate, context, done){
        var sql = "SELECT * FROM `vehicles` WHERE licensePlate=?"
        var insert =[licensePlate];
        mysql.pool.query(sql, insert, function(err, results, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }else{
                

                context.vehicle =  results;
                
                done();
            }
        });

    }

    function getOffenses(mysql,licensePlate, incidentID,context,done){
        var sql = "SELECT offenses.name , offenses.offenseID, incidents.incidentID FROM incidents INNER JOIN incidentsOffenses ON incidents.incidentID = incidentsOffenses.incidentID INNER JOIN offenses ON incidentsOffenses.offenseID = offenses.offenseID INNER JOIN evidence ON incidents.incidentID =  evidence.incidentID INNER JOIN vehicles ON incidents.licensePlate = vehicles.licensePlate WHERE vehicles.licensePlate=? AND incidents.incidentID =?"
        var insert =[licensePlate, incidentID];
        mysql.pool.query(sql, insert, function(err, results, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }else{
                context.offense =  results;
                done();

            }
        });

    }

    function getIncident(mysql,licensePlate, incidentID,context,done){
        var sql = "SELECT incidents.city, incidents.state, incidents.date, evidence.description, incidents.incidentID, vehicles.licensePlate FROM incidents INNER JOIN incidentsOffenses ON incidents.incidentID = incidentsOffenses.incidentID INNER JOIN offenses ON incidentsOffenses.offenseID = offenses.offenseID INNER JOIN evidence ON incidents.incidentID =  evidence.incidentID INNER JOIN vehicles ON incidents.licensePlate = vehicles.licensePlate WHERE vehicles.licensePlate=? AND incidents.incidentID =? GROUP BY incidents.incidentID"
        var insert =[licensePlate, incidentID];
        mysql.pool.query(sql, insert, function(err, results, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }else{
                context.incident =  results;
                done();

            }
        });

    }

    router.delete('/offense/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM `offenses` WHERE offenseID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                console.log(err)
                res.write(JSON.stringify(err));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    });

    router.delete('/incident/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM `incidents` WHERE incidentID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                console.log(err)
                res.write(JSON.stringify(err));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    });

    router.get('/', function(req, res){

      res.render('searchByLicense');


    });

    router.get('/incident/:lp/:id', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        context.jsscripts = ["deleteOffenses.js", "updateIncident.js", "addOffense.js"];
        getVehicle(mysql,req.params.lp,context,done);
        getIncident(mysql,req.params.lp, req.params.id,context,done);
        getOffenses(mysql,req.params.lp, req.params.id,context,done);
        function done(){
            callbackCount++;
            if(callbackCount >= 3){
                console.log(context);
                res.render('updateDelete', context);;
                
            }
        }
       
    });

    router.put('/incident/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE `incidents` SET city=?, state=?, date=? WHERE incidentID=?";
        var inserts = [req.body.city, req.body.state, req.body.date, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(err, result, fields){
            if(err){
                console.log(err)
                res.write(JSON.stringify(err));
                res.end();
            }else{
                updateEvidence();
               
            }
        });

        function updateEvidence() {
            sql = "UPDATE `evidence` SET description=? WHERE evidence.incidentID =?";
            inserts = [req.body.description];
            sql = mysql.pool.query(sql,inserts,function(err, result, fields){
                if(err){
                    console.log(err)
                    res.write(JSON.stringify(err));
                    res.end();
                }else{
                    
                    res.status(200);
                    res.end();
                }
            });
        };
        
    });

    router.put('/offense/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO `incidentsOffenses` (`incidentID`, `offenseID`) VALUES (?, ?);";
        var inserts = [req.params.id, req.body.offense];
        sql = mysql.pool.query(sql,inserts,function(err, result, fields){
            if(err){
                console.log(err)
                res.write(JSON.stringify(err));
                res.end();
            }else{
                res.status(200);
                res.end();
               
            }
        });
        
    });



    return router;
}();