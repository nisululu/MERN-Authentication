const express = require('express')
const { newTest, updateProfile, logout, deleteUser } = require('../controller/user.controller')
const { isAuthenticatedUser } = require('../utils/authenticate')
const router = express.Router()

router
    .put('/update/:id', isAuthenticatedUser, updateProfile)
    .get('/logout', logout)
    .delete('/delete/:id', deleteUser)

module.exports = router