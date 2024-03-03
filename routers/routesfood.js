const express = require('express');
const router = express.Router();
const {getOnePersonFood} = require('../controllers/personController')

router.get('/', getOnePersonFood)


module.exports = router