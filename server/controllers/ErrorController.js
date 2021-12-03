const createError = require('http-errors')

const UNKNOWN_ERROR = 'Une erreur inconnue est survenue'

class ErrorController {
  notFound(req, res, next) {
    next(createError(404))
  }

  handleError(e, req, res, next) {
    const isEnvDev = req.app.get('env') === 'development'
    const message = 400 <= e.code < 500 || isEnvDev ? e.message : UNKNOWN_ERROR
    res.locals.message = message
    res.locals.error = isEnvDev ? e : {}
    res.status(e.status || 500)
    res.json({ message })
  }
}

module.exports = new ErrorController()
