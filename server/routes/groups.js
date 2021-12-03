const GroupsController = require('../controllers/GroupsController')
const express = require('express')
const router = express.Router()

router.get('/', GroupsController.all)
router.get('/:number', GroupsController.students)
router.post('/:number', GroupsController.addStudent)
router.delete('/:number/:id', GroupsController.deleteStudent)

module.exports = router
