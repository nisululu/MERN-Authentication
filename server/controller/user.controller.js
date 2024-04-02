const User = require("../models/User.model")
const bcryptjs = require('bcryptjs')
const errorHandler = require('../utils/error')
const jwt = require('jsonwebtoken')

exports.updateProfile = async (req, res, next) => {
    const { id } = req.params
    const { password, username, email, profilePicture } = req.body

    try {
        const user = await User.findById(id)
        if (!user) return next(errorHandler(400, "User not found!"))

        if (password) {
            req.body.password = bcryptjs.hashSync(password, 10)
        }

        updateUser = await User.findByIdAndUpdate(id, { $set: { username, password: req.body.password, email, profilePicture } }, { new: true })
        const { password: hashedPass, ...rest } = updateUser._doc
        res.status(200).json({
            message: "user updated successfully",
            rest
        })


    } catch (err) {
        next(err)
    }
}

exports.logout = async (req, res, next) => {
    res.cookie('token', null, { httpOnly: true, expires: new Date(Date.now())}).json({message:"Successfully logged out!"})
}

exports.deleteUser = async(req, res, next) => {
    const {id} = req.params

    try{
        const user = await User.findById(id)
        if (!user) return next(errorHandler(400, "User not found!"))

        await user.deleteOne()
        res.status(200).json({message: "User Deleted Successfully"})
    }catch(err){
        next(err)
    }
}