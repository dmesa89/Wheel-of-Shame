
//setup 
var express = require('express');
var mysql = require('./dbcon.js');


var app = express();
var handlebars = require('express-handlebars');
var hbs = handlebars.create({
  helpers: {
      changeDate: function (str) {
        var date = new Date(str),
         mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
  },defaultLayout:'main'});

  app.engine('handlebars', hbs.engine);
  
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 4857);
app.set('mysql', mysql);


// Routes for webpages

app.use('/searchBylicense', require('./searchByLicense.js'));
app.use('/searchByLocation', require('./searchByLocation.js'));
app.use('/admin', require('./admin.js'));


app.get('/', function(req, res) {
  var context = {};
  res.render('index', context);
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.use('/incident', require('./incident.js'));


//Error handling
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


//set server up
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

