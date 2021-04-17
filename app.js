const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://dbuser:dbuser@node-rest-shop.jfxlx.mongodb.net/node-rest-shop?retryWrites=true&w=majority");

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header(

        "Access-Control-Allow-Headers","Origin,Content-Type,Authorization,X-Requested-With"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE')
        return res.status(200).json({});
    };
    next();

});


app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            messsage: error.message
        }
    });
});

module.exports = app; 