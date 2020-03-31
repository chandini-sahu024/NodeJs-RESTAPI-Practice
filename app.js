const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser') // Body parser module import

const mongoose = require('mongoose');

const productsRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');
const userRoute = require('./api/routes/user');

mongoose.connect(
    'mongodb+srv://chandini:chicken123@cluster0-rhtbe.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }   
);
app.use(morgan('dev'));

// Body parser module
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/user', userRoute);
app.use((req, res, next) => {
    const error = new Error('API Not found');
    console.log('Request received from client');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log('Request received from client');
    res.status(error.status || 500);
    res.json({
        error : { 
        "message": error.message,
        "error" : "try again"
        }
    })
});

module.exports = app;