const express = require('express');
const router = express.Router();


router.get("/", (req, res, next) => {
    console.log('Request received from client');
    res.status(200).json({
        message: "it works for order and in GET"
    });
});

router.post("/", (req, res, next) => {
    console.log('Request received from client');
    res.status(200).json({
        message: "it works for orderand in POST"
    });
});

router.delete("/", (req, res, next) => {
    console.log('Request received from client');
    res.status(200).json({
        message: "it works for orders and in DELETE"
    });
});


module.exports = router;