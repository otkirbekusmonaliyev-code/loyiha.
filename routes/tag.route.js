const express = require('express')
const { checkToken } = require('../middleware/auth.middleware')
const route = express.Router()

const {
    CREATE,
    GET
} = require('../controllers/tag.controller')

route.get('/tag', checkToken, GET)
route.post('/tag', checkToken, CREATE)

module.exports = route
