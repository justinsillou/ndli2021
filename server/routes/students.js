const StudentsController = require('../controllers/StudentsController')
const express = require('express')
const router = express.Router()

router.get('/', StudentsController.all)
router.get('/:id', StudentsController.one)
router.post('/', StudentsController.add)
router.put('/:id', StudentsController.update)
router.delete('/:id', StudentsController.delete)

module.exports = router
