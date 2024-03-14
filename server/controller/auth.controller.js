const User = require("../models/User.model")
const bcryptjs = require('bcryptjs')
const errorHandler = require('../utils/error')
exports.signup = async(req, res, next) => {
    const {username, email, password} = req.body
    const hashedPass = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password: hashedPass})
    try{
        await newUser.save()
        res.status(200).json({
            message: "User Successfully added",
            newUser})
    }catch(err){
        next(err)
    }
}