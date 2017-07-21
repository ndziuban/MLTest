var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var routes = require('./routes/index');

var app = express();
var hbs = require('hbs');
var router = express.Router();

var hbsutils = require('hbs-utils')(hbs);


app.set('x-powered-by', false);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/src', express.static(path.join(__dirname, 'src'), { maxAge: 86400000 }));
app.use('/statics', express.static(path.join(__dirname, 'statics'), { maxAge: 604800000 }));

app.use('/', routes);

app.use(function(req,res,next){
  var _send = res.send;
  var sent = false;
  res.send = function(data){
    if(sent) return;
    _send.bind(res)(data);
    sent = true;
  };
  next();
});

hbsutils.registerPartials(__dirname + '/views/', { precompile: true });

hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

hbs.registerHelper('isNew', function(string, options) {
  if (string && string == 'new') {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('hasDescription', function(el, options) {
  if (el && el.description != '') {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = app;
