const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/users');

router.post('/signup' ,(req, res, next) => {
    User.find({email: req.body.email })
    .exec()
    .then(user => {
        console.log(user);
        console.log(user.length);
        if(user.length > 0){
            return res.status(409).json({
                message: "Mail exist"
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email ,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created'
                        });
                        console.log(user);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
        
                    });
                }
            });
        }
    })
    
});

module.exports = router;