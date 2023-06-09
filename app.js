const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const productMain = require('./routes/productMain');
const oderRouter = require('./routes/oder');
const oderDetailRouter = require('./routes/oderDetail');
const sendMail = require('./routes/sendMail');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
);

app.use('/user', usersRouter);
app.use('/category', categoryRouter);
app.use('/oder', oderRouter);
app.use('/oderdetai', oderDetailRouter);
app.use('/apiproduct', productMain);
app.use('/mail', sendMail);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
