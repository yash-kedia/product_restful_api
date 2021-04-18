const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/signup',(req,res,next) => {

  bcrypt.hash(req.body.password,10, (err,hash) => {
      if(err){

        return res.status(500).json({
            error:err
        });

      }else{
          const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: {type: String, required: true},
              passord: hash
          });
          user.save().then( result => {
              console.log(user);
              res.status(201).json({
                  msg: 'User created'
              });
              
          }).catch( err => {
              res.status(500).json({
                  error: err
              });
          }
              
          );
      }
  })

});





module.exports = router;