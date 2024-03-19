const jwt = require('jsonwebtoken')
const User = require("../models/User.model")

exports.isAuthenticatedUser = async (req, res, next) => {
    const {token} = req.cookies
    if(!token) return next(errorHandler(400, "Please login to access."))
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode.id)
    next()

}