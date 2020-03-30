

const express = require ('express');
const router = express.Router();
const chalk = require('chalk');


router.get('/', (req, res)=> {
    res.send({response: 'server is up and Running: 👽 '}).status(200)
});

module.exports = router;




