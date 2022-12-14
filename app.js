var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./my_portfolio/routes/index');
var users = require('./my_portfolio/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname,'my_portfolio', 'views'));
app.set('view engine', 'pug');

//serving static file botsrap
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//with prefix
app.use("/bootstrap", express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use('/', index);
app.use('/users', users);
app.use("/portfolio", express.static(path.join(__dirname, 'portfolio')));


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
  res.render('error');
});

module.exports = app;
