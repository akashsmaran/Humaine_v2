var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRoutes = require('./routes/authRoutes')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
 origin: '*',
 methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
 allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRoutes);
module.exports = app;
