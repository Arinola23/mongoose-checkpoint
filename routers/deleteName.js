const express = require('express');
const router = express.Router();
const {deleteName} = require('../controllers/personController');


router.delete('/:name', deleteName);

module.exports = router