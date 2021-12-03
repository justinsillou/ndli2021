const Students = require('../models/students').model
const Groups = require('../models/groups').model
const NotFoundError = require('../errors/NotFoundError')
const ValidationError = require('../errors/ValidationError')

class StudentsController {
  async all(_, res, next) {
    const students = await Students.find().catch(next)
    res.json(students)
  }

  async one(req, res, next) {
    const { id } = req.params
    const student = await Students.findById(id).catch(next)

    if (!student) return next(NotFoundError('Étudiant non trouvé'))

    res.json(student)
  }

  async add(req, res, next) {
    const { firstNames, lastName, nip } = req.body

    if (!firstNames || !lastName || !nip)
      return next(ValidationError('Un des champs est absent'))

    try {
      const student = await Students.create({
        firstNames: firstNames.split(','),
        lastName,
        nip,
      })

      res.status(201).json(student)
    } catch (e) {
      let message

      switch (e.name) {
        case 'ValidationError':
          message = 'Erreur de validation des données'
          break
        case 'MongoError':
          if (e.code == 11000) {
            message = 'Ce NIP existe déjà'
            break
          }
        default:
          return next(e)
      }

      next(ValidationError(message))
    }
  }

  async update(req, res, next) {
    const { id } = req.params
    const { firstNames, lastName } = req.body
    const student = { lastName, firstNames: firstNames.split(',') }

    const updated = await Students.findByIdAndUpdate(id, student, {
      new: true,
    }).catch(next)
    res.status(200).json(updated)
  }

  async delete(req, res, next) {
    const { id } = req.params

    const student = await Students.findById(id).catch(next)

    await Groups.findOne({ student })?.deleteOne().catch(next)
    await student?.deleteOne().catch(next)

    res.status(200)
    res.end()
  }
}

module.exports = new StudentsController()
