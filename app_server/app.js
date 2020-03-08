var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var cors = require('cors');
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/data',indexRouter);

module.exports = app;
