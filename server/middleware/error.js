const errorHandler = require('../utils/error')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = errorHandler(400, message)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err.statusCode
    })
}