const express = require('express')
const { checkToken } = require('../middleware/auth.middleware')
const route = express.Router()

const {
    CREATE,
    GET,
    DELETE
} = require('../controllers/TaskTags.controller')

route.get('/task/:taskId/tag', checkToken, GET)
route.post('/task/:taskId/tag/:tagId', checkToken, CREATE)
route.delete('/task/:taskId/tag/:tagId', checkToken, DELETE)

module.exports = route
