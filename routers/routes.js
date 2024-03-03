const express = require('express');
const router = express.Router();
const {setPerson,getOnePerson, AllPerson, classicalUpdate,deleteOne,deleteName} = require('../controllers/personController')

 router.post('/', setPerson)
 router.put('/:personId', classicalUpdate);
router.get('/:id', getOnePerson)
router.get('/', AllPerson)
router.delete('/:personId', deleteOne)
// router.delete('/:name', deleteName)

module.exports = router