var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var httpResult = require('./config').httpResult;
var sessionOptions = require('./config/index.js').sessionOptions;
var authPathsReg = require('./config/index.js').authPathsReg;

// 引入自定义文件
var productRoute = require('./routes/product.js');
var categoryRoute = require('./routes/category.js');
var userRoute = require('./routes/user.js');
var cartRoute = require('./routes/cart.js');
var profileRoute = require('./routes/profile.js');
var addressRoute = require('./routes/address.js');
var orderRoute = require('./routes/order.js');

var indexRouter = require('./routes/index.js');
var topRouter = require('./routes/top.js');
var adminRouter = require('./routes/admin.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(session(sessionOptions));
app.use(express.static(path.join(__dirname, 'public')));

// 登陆验证
app.use('*', function(req, res, next) {
	var isAuthPath = authPathsReg.test(req.baseUrl);
	if(isAuthPath&&!req.session.name) res.send(httpResult.untoken());
	else next();
});
app.use('/index', indexRouter);
app.use('/product', productRoute);
app.use('/category', categoryRoute);
app.use('/login', userRoute);
app.use('/cart', cartRoute);
app.use('/profile', profileRoute);
app.use('/top', topRouter);
app.use('/address', addressRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRouter);

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
