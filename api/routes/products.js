const express = require('express');

const router = express.Router();

const Product = require('../models/product');

const mongoose = require('mongoose');

/*app.use((req, res, next) => {
    console.log('Request received from client');
    res.status(200).json({
        message: "it works and in root"
    });
});*/

/*app.get("/", (req, res, next) => {
    console.log('Request received from client');
    res.status(200).json({
        message: "it works and in GET"
    });
});*/

router.get("/", (req, res, next) => {
    console.log('Request received from client');
    Product
        .find()
        .exec()
        .then(doc => {
            console.log("from database", doc);
            
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    
});

router.get("/:productid", (req, res, next) => {
    
    const id = req.params.productid;
    console.log('Request received from client '+ id)
    Product
        .findById(id)
        .exec()
        .then(doc => {
            console.log("from database", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    /*res.status(200).json({
        message: "it works for products wrt id and in GET " + id
    });*/
});

router.post("/", (req, res, next) => {
    const newProduct = {
        name : req.body.name,
        price : req.body.price
    };
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    
    });
    
    product
        .save()
        .then(result => {
            console.log(result);
            console.log('Request received from client');
            res.status(201).json({
                message: "it works for products and in POST",
                cretedProduct: product
            });
        })
        .catch(err => console.log(err));
    

    
});

router.delete("/", (req, res, next) => {
    console.log('Request received from client');
    res.status(200).json({
        message: "it works for products and in DELETE"
    });
});


module.exports = router;