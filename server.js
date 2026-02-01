const express = require('express')
const { sequelize } = require('./config/db')
const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const taskRoute = require('./routes/task.route')
const subtaskRoute = require('./routes/subtask.route')
const TaskTagsRoute = require('./routes/TaskTags.route')
const tagRoute = require('./routes/tag.route')


let app = express()

app.use(express.json())

async function start() {
	await sequelize.sync()
	console.log('*Connected to db')

	app.use('/auth', authRoute)
	app.use(userRoute)
	app.use(taskRoute)
	app.use(subtaskRoute)
	app.use(TaskTagsRoute)
	app.use(tagRoute)

	app.listen(3000, () => console.log('This server is running on', 3000))
}
start()
