const express = require('express')
const { sequelize } = require('./config/db')

let app = express()

app.use(express.json())

async function start() {
	await sequelize.sync()
	console.log('*Connected to db')

	app.listen(3000, () => console.log('This server is running on', 3000))
}
start()
