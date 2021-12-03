const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const students = require('./routes/students')
const groups = require('./routes/groups')
const ErrorController = require('./controllers/ErrorController')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/students', students)
app.use('/groups', groups)

app.use(ErrorController.notFound)
app.use(ErrorController.handleError)

module.exports = app
