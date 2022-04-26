 const express = require('express');

const router = express.Router();

const authorController = require('../controller/authorController.js');

//authors
router.post('/authors', authorController.author) //create authors

 module.exports = router;