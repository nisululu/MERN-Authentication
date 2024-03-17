const User = require("../models/User.model")
const bcryptjs = require('bcryptjs')
const errorHandler = require('../utils/error')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPass = bcryptjssh.haSync(password, 10)
    const newUser = new User({ username, email, password: hashedPass })

    try {
        await newUser.save()
        res.status(200).json({
            message: "User added Successfully",
            newUser
        })
    } catch (err) {
        next(err)
    }
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        const comparePassword = bcryptjs.compareSync(password, user.password)
        
        if (!user) return next(errorHandler(400, "User not Found")) 
        if(!comparePassword) return next(errorHandler(401, "Wrong credentials."))

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        const {password: hashedPassword, ...rest} = user._doc
        
        res.cookie('token',token, {httpOnly: true, expires: new Date(Date.now() + 3600000)}).json(rest)

    } catch (err) {
        next(err)
    }
}