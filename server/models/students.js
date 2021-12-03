const dbConnection = require('../controllers/dbConnection')
const mongoose = require('mongoose')

String.prototype.toTitleCase = function () {
  return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase()
}

const StudentsSchema = new mongoose.Schema({
  firstNames: {
    type: [String],
    required: true,
    get: v => v.join(','),
    set: l => l.map(v => v.trim().toTitleCase()),
  },
  lastName: {
    type: String,
    required: true,
    set: v => v.trim().toUpperCase(),
  },
  nip: {
    type: String,
    required: true,
    unique: true,
  },
})

const Students = dbConnection.model('Students', StudentsSchema)

module.exports = StudentsSchema
module.exports.model = Students
