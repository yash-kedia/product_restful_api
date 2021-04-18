const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/',(req,res,next) =>{
    Order.find().exec().then(docs => {
        res.status(200).json(docs);
    }).catch(err =>{
        res.status(500).json({
            error:err
        })
    });
    
    
});

router.post('/',(req,res,next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId 
    });
    order.save().then(result => {
        console.log(result);
        res.status(201).json(result);}
    ).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
   
});

router.get('/:orderID',(req,res,next) => {
    
    res.status(200).json({
        msg: 'order was created',
        orderId: req.params.orderID
    });
});

router.delete('/:orderID',(req,res,next) => {
    res.status(200).json({
        msg: 'order was deleted'
    });
});
module.exports = router;