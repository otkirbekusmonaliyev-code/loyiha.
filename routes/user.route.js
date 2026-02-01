const express = require('express')
const { checkToken } = require('../middleware/auth.middleware')
const route = express.Router()

const {
    GET,
    GET_BY_ID,
    DELETE_USER,
    UPDATE_USER
} = require('../controllers/user.controller')

route.get('/user', checkToken, GET)
route.get('/user/:id', checkToken, GET_BY_ID)
route.put('/user/:id', checkToken, UPDATE_USER)
route.delete('/user/:id', checkToken, DELETE_USER)

module.exports = route