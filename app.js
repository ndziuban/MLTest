// if(process.env.NODE_ENV === 'prod'){
//   try {
//     require('@newrelic/beta-agent');
//   } catch(err) {
//     console.log('\x1b[33m%s\x1b[0m ', 'Newrelic module not found. We are not tracking anything');
//   }
// }else{
// try {
//   require('newrelic');
// } catch (err) {
//   console.log('\x1b[33m%s\x1b[0m ', 'Newrelic module not found. We are not tracking anything');
// }

// pe = require('pretty-error').start();

// }
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
// var log_context = require('./utils/LogContext');

// var mongoose = require('mongoose');
// var bannerModel = require('./models/banner');
// var seoTextModel = require('./models/seoText');
// var adModel = require('./models/ad');
// var isProcessing = require('./models/isProcessing');
// var assetModel = require('./models/asset');
// var seoUrls = require('./models/seoUrls');
// var seoFields = require('./models/seoFields');
// var seoUrlsCounter = require('./models/seoUrlsCounter');
// var blacklistModel = require('./models/blacklist');

var routes = require('./routes/index');

var app = express();
var hbs = require('hbs');
var router = express.Router();

// var config = require('./config');

// var app_version = fs.readFileSync('APP_VERSION').toString().trim();

// var categories = require('./services/categories');
// var seoUrlsService = require('./services/seo-urls.service');

// var Memcached = require('memcached');
// var NodeCache = require("node-cache");

// global.memcached = new Memcached(config.memcached(), { timeout: config.memcachedTimeout(), poolSize: 200, retries: 0, idle: 10000, reconnect: 15000 });
// global.nodecache = new NodeCache();
var hbsutils = require('hbs-utils')(hbs);


app.set('x-powered-by', false);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(function(req, res, next) {
//   var xBrand = req.headers['x-brand'];
//
//   if (!xBrand) {
//     xBrand = 'garbarino';
//   } else {
//     xBrand = xBrand.toLowerCase();
//   }
//
//   res.locals.normandia_endpoint = config.general(xBrand).normandia_endpoint;
//   res.locals.statics_endpoint = config.general(xBrand).statics_endpoint;
//   res.locals.banners_endpoint = config.general(xBrand).banners_endpoint;
//   res.locals.app_version = app_version;
//   res.locals.GA = config.GA;
//   res.locals.gtm = config.general(xBrand).gtm;
//
//   next();
// });

// app.use(function(req, res, next) {
//
//   var cookie = req.cookies['epi.context'];
//   if (cookie === undefined) {
//     var userId = '"{\\"userId\\":\\"' + generateUUID() + '\\"\}"';
//     res.cookie('epi.context', userId, { encode: String });
//     req.cookies["epi.context"] = userId;
//   }
//
//   next();
// });

// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use('/src', express.static(path.join(__dirname, 'src'), { maxAge: 86400000 }));
app.use('/statics', express.static(path.join(__dirname, 'statics'), { maxAge: 604800000 }));




app.use('/', routes);



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

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

// categories.getCategories('garbarino');
// categories.getCategories('compumundo');
// seoUrlsService.getUrlsParams();

//Partials

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
//
// /**
//  * @name isPrice
//  * @description Partial to check if filter is price or not
//  * @return {Options}
//  */
// hbs.registerHelper('isPrice', function(el, options) {
//   if (el.name === 'price') {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
//
// hbs.registerHelper('isSearch', function(type, options) {
//   if (type === 'searchresult') {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
//
// hbs.registerHelper('isNotSearch', function(type, options) {
//   if (type !== 'searchresult') {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
//
// hbs.registerHelper('isCategory', function(type, options) {
//   if (type === 'category') {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
//
// hbs.registerHelper('isProductList', function(type, options) {
//   if (type === 'productList') {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
//
// hbs.registerHelper('isBrand', function(type, options) {
//   if (type === 'brand') {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
//
// hbs.registerHelper('isDiscount', function(type, options){
//   if(type === 'discount') {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
//
// hbs.registerHelper('productWithDiscount', function(product, options){
//   if(product.discount && product.discount > 0) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
//
// hbs.registerHelper('enoughDiscount', function(product, options){
//   if(product.discount && product.discount >= 10) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
//
// /**
//  * @name generateUUID
//  * @description Generate cookie
//  * @return {String}
//  */
// function generateUUID() {
//   function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   }
//
//   return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//     s4() + '-' + s4() + s4() + s4();
// }

module.exports = app;
