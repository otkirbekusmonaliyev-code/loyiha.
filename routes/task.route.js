const express = require('express')
const { checkToken } = require('../middleware/auth.middleware')
const route = express.Router()

const {
    CREATE,
    GET,
    GET_BY_ID,
    DELETE,
    UPDATE,
} = require('../controllers/task.controller')

route.get('/task', checkToken, GET)
route.get('/task/:id', checkToken, GET_BY_ID)
route.post('/task', checkToken, CREATE)
route.put('/task/:id', checkToken, UPDATE)
route.delete('/task/:id', checkToken, DELETE)

module.exports = route