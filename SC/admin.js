module.exports = function(){

    var express = require('express');
    var router = express.Router();
    
    function getVehicles(res, mysql, context, done){
        mysql.pool.query("SELECT * FROM vehicles", function(err, result, fields){
            if(err){ 
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            
            context.vehicles = result;
            console.log(context);
            
        
            done();
        });
    }
    
    function getIncidents(res, mysql, context, done){
        mysql.pool.query("SELECT * FROM incidents", function(err, result, fields){
            if(err){ 
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.incidents = result;
            
    
            done();
        });
    }

    function getIncidentsOffenses(res, mysql, context, done){
        var sql_query = "SELECT * from incidentsOffenses";
        mysql.pool.query(sql_query, function(err, result, fields){
            if(err){ 
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.incidentsOffenses = result;
            

            done();
        });
    }

    function getEvidence(res, mysql, context, done){
        var sql_query = "SELECT incidentID, description from evidence";
        mysql.pool.query(sql_query, function(err, result, fields){
            if(err){ 
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.evidence = result;
            

            done();
        });
    }




    router.get('/', function(req, res){

        var callbackCount = 0;
        var context = {};

        console.log(context);
        var mysql = req.app.get('mysql');

        getVehicles(res, mysql, context, done);
        getIncidents(res, mysql, context, done);
        getIncidentsOffenses(res, mysql, context, done);
        getEvidence(res, mysql, context, done);
        console.log(context);

        function done(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('admin', context);
            }
        }

    });

    return router;
}();