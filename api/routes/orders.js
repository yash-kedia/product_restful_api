const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/',(req,res,next) =>{
    Order.find().exec().then(docs => {
        res.status(200).json({
            count:docs.length,
            order:docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request:{
                        type:'GET',
                        url: 'http://localhost/orders'+doc._id
                    }
                }
            })
            
        });
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
        res.status(201).json({
            msg: 'Order Created',
            createdOrder:{
                _id: result.id,
                quantity:result.quantity,
                product:result.product

            },
            request:{
                type:'GET',
                url: 'https://localhost:3000/orders'+result._id
            }
        });}
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