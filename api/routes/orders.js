const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) =>{
    res.status(200).json({
        msg: 'order were fetched'
    });
});

router.post('/',(req,res,next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(200).json({
        msg: 'order was created',
        order: order
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