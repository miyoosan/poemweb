var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var log4js = require('./utils/log4jsutil');
var moment = require('moment');

var home = require('./routes/home');
var user = require('./routes/user');
var message = require('./routes/message');
var feedback = require('./routes/feedback');
var sms = require('./routes/sms');
var report = require('./routes/report');
var banner = require('./routes/banner');
var appweb = require('./routes/appweb');
var material = require('./routes/material');
var pimage = require('./routes/pimage');

var app = express();

log4js.use(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'jade');
// //设置html引擎
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.locals.moment = moment;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pictures',express.static(path.join(__dirname, 'pictures')));

app.use('/', home);
app.use('/user', user);
app.use('/message', message);
app.use('/feedback', feedback);
app.use('/sms', sms);
app.use('/report', report);
app.use('/banner', banner);
app.use('/appweb', appweb);
app.use('/material', material);
app.use('/pimage', pimage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error',{err:err});
});


module.exports = app;
