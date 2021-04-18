const mongoose = require('mongoose');


exports.products_get_all = (req,res,next) => {
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
}