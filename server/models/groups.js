const dbConnection = require('../controllers/dbConnection')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupsSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
})

const Groups = dbConnection.model('Groups', GroupsSchema)

module.exports = GroupsSchema
module.exports.model = Groups
