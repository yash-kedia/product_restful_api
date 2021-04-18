const express = require('express');
const Product = require('../models/product');
const mongoose = require('mongoose');
const { request } = require('../../app');

const router = express.Router(); 


router.get('/', (req,res,next) => {
    Product.find().exec().then(
        docs => {
         const response  = {
             count: docs.length,
             products: docs.map(doc => {
                 return {
                     name: doc.name,
                     price: doc.price,
                     _id: doc._id,
                     request: {
                         type:'GET',
                         url: 'http://localhost:3000/products/'+doc._id
                     }
                 }
             })

         };
         res.status(200).json(response);   
        }
            
    ).catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        })
    });
});


router.post('/', (req,res,next) => {
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    });
    product.save().then(result => {

        
        res.status(200).json({
            msg:"Created product successfully",
            createdProduct: {
                name:result.name,
                price:result.price,
                _id: result._id,
                request:{
                type:'GET',
                url: 'https://localhost:3000'+request._id
                
            }
        }
        }); 
    }).catch(
        err => {
            console.log(err);
    res.status(500).json(
        {
            error:err 
    });
});
    
});

router.get('/:productId',(req,res,next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        if(doc){
        res.status(200).json( {
            product: doc,
            request:{
                type:'GET',
                description:' Get all products',
                url : 'http://localhsot:3000/products'
            }
         } )}
       
        
    }).catch(err =>{console.log(err);  

        res.status(500).json({error:err});
});

    
});


router.patch('/:productId',(req,res,next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set :updateOps}).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message:'Product updated',
            request:{
                type:'GET',
                url:'http://localhost/products/'+ id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
   
});

router.delete('/:productId',(req,res,next) => {
    const id = req.params.productId;
    Product.remove({_id:id}).exec().then(
        result => {
            res.status(200).json(result);
        }

    ).catch( err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});
module.exports = router;