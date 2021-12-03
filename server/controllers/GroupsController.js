const Groups = require('../models/groups').model
const Students = require('../models/students').model
const NotFoundError = require('../errors/NotFoundError')
const ValidationError = require('../errors/ValidationError')

class GroupsController {
  async all(_, res, next) {
    const groups = await Groups.find()
      .populate({ model: Students, path: 'student' })
      .catch(next)
    res.json(groups)
  }

  async students(req, res, next) {
    const { number } = req.params
    const students = await Groups.find({ number })
      .populate({ model: Students, path: 'student' })
      .catch(next)
    res.json(students)
  }

  async addStudent(req, res, next) {
    const { number } = req.params
    const { id } = req.body

    const student = await Students.findById(id).catch(next)

    if (student == null) return next(NotFoundError('Étudiant non trouvé'))

    const groupStudent = await Groups.findOne({ student }).catch(next)

    if (groupStudent != null)
      return next(ValidationError('Étudiant déjà dans un groupe'))

    await Groups.create({ number, student }).catch(next)
    res.status(201)
    res.end()
  }

  async deleteStudent(req, res, next) {
    const { number, id: student } = req.params
    await Groups.findOne({ number, student })?.deleteOne().catch(next)
    res.status(200)
    res.end()
  }
}

module.exports = new GroupsController()
