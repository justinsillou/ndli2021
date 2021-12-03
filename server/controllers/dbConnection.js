const mongoose = require('mongoose')

const dbHost = 'localhost'
const dbPort = 27017
const dbName = 'students'
const dbURI = `mongodb://${dbHost}:${dbPort}/${dbName}`

const dbConnection = mongoose.createConnection(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})

dbConnection.once('connected', () => {
  console.log(`db: connected to ${dbURI}`)
})

dbConnection.once('disconnected', () => {
  console.log(`db: disconnected from ${dbURI}`)
})

dbConnection.on('error', err => {
  console.log(`db: connection error ${err} `)
})

const shutdown = (msg, callback) => {
  dbConnection.close(() => {
    console.log(`Mongoose shutdown: ${msg}`)
    callback()
  })
}

const readline = require('readline')

if (process.platform === 'win32') {
  readline
    .createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    .on('SIGINT', function () {
      process.emit('SIGINT')
    })
}

// application killed (ctrl+c)
process.on('SIGINT', () => shutdown('application ends', () => process.exit(0)))
// process killed (POSIX)
process.on('SIGTERM', () => shutdown('SIGTERM received', () => process.exit(0)))

module.exports = dbConnection
