var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup

var engines = require('consolidate');

app.engine('html', engines.mustache);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// prepare server 
//app.use('/api', api); // redirect API calls 
app.use('/', express.static(__dirname + '/www')); // redirect root 
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

출처: https://jizard.tistory.com/102 [GEUMSON]
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
