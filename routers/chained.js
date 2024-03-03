const express = require('express');
const router = express.Router();
const {chainedSearch} = require('../controllers/personController')

router.get('/burritos', chainedSearch)

module.exports = router