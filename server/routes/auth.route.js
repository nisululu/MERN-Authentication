const express = require('express')
const { signup, signin, google, updateProfile } = require('../controller/auth.controller')
const { isAuthenticatedUser } = require('../utils/authenticate')
const router = express.Router()

router
    .post('/signup', signup)
    .post('/signin', signin)
    .post('/google', google)

module.exports = router