const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String,required:true,trim:true},
    price: {type:Number,required:true,trim:true}


});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;