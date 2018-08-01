require ('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require ('mongoose');

const url = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds145121.mlab.com:45121/e-commerce`;
const cors = require('cors');



mongoose.connect(url, {useNewUrlParser: true} , function(err){
  if(err) console.log(err);
  console.log("DB connected")
})


const indexRouter = require('./routes/index');
const inventoryRouter = require('./routes/inventory');
const cartRouter = require('./routes/cart');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);
app.use('/cart', cartRouter)
app.use('/users', usersRouter);


module.exports = app;
