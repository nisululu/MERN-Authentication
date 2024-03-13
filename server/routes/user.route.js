const express = require('express')
const {newTest} = require('../controller/user.controller')
const router = express.Router()

router.get('/',newTest)

module.exports = router