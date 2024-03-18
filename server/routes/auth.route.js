const express = require('express')
const { signup, signin, google } = require('../controller/auth.controller')
const router = express.Router()

router
    .post('/signup', signup)
    .post('/signin', signin)
    .post('/google', google)

module.exports = router