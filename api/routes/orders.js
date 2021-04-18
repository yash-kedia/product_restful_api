const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const  OrdersController = require( '../controllers/orders');

router.get('/',OrdersController.orders_get_all);

router.post('/',OrdersController.orders_create_order);

router.get('/:orderID',OrdersController.orders_get_order);

router.delete('/:orderID',OrdersController.order_delete_order);
module.exports = router;