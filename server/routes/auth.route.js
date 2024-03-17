const express = require('express')
const { signup, signin } = require('../controller/auth.controller')
const router = express.Router()

router
    .post('/signup', signup)
    .post('/signin', signin)

module.exports = router