const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


router.post('/signup',(req,res,next) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length>=1){
            return res.status(409).json({
                msg: 'Mail exists'
            });
        }else{
            const salt = bcrypt.genSaltSync(10);
    
    const user = new User ({
        _id: new mongoose.Types.ObjectId(),
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password,salt)
    })
    user.save()
    .then(
        result => {
            console.log(result);
            return res.status(200).json({
                msg:'user created'
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error:err
            });
        })

        }
    });
    
    

  

});

router.post('/login', (req,res,next) => {
    User.findOne({email:req.body.email})
    .exec()
    .then( user => {
        if(user.length<1){
            return res.status(401).json({
                msg:'auth failed'
            })
        }else{
            bcrypt.compare(req.body.password,user[0].password),(err,result)=>{
                if(err){
                    return res.status(401).json({
                        msg:'auth failed'
                    });
                }
                if(result){
                   const token =  jwt.sign({
                        email: req.user[0].email,
                        userId : user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn : "1h"
                    }

                    )
                   return  res.status(200).json({
                        msg:'auth successfull',
                        token: token
                        
                    });
                }
               res.status(401).status.json({
                   msg:'auth failed'
               });
            }
        }
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        });
    })
})

router.delete('/:userId',(req,res,next) => {
    User.remove({_id: req.params.id}).exec()
    .then(res => {
        return res.status(200).json({
            msg: 'user deleted'
        });
    })
    .catch(err => {
        return res.status(500).json({
            error:err
        });
    })
})





module.exports = router;