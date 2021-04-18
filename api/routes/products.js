const express = require('express');
const router = express.Router(); 
const Product = require('../models/product');
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const   ProductController  = require('../controllers/products');





router.get('/', ProductController.products_get_all);


router.post('/', ProductController.product_new_product);

router.get('/:productId',ProductController.products_get_product);


router.patch('/:productId',ProductController.product_update_product);

router.delete('/:productId',ProductController.products_delete_product);
module.exports = router;