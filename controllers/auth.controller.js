const { User } = require('../models/relations.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const REGISTER = async (req, res) => {
	const { name, email, password } = req.body
	const isExistPhone = await User.findOne({
		where: {
			password: password,
		},
	})
	const isExistEmail = await User.findOne({
		where: {
			email,
		},
	})
	if (isExistEmail && isExistPhone)
		return res.json({
			message:
				"Bu password raqam yoki email bilan allaqachon ro'yhatdan o'tilgan",
		})

	if (!(email && password))
		return res.json({
			message: 'email and password required',
		})

	let data = await User.create({
		name,
		email,
		password: await bcrypt.hash(password, 12),
	})

	return res.json({
		message: 'Successfully registered',
		data,
	})
}

const LOGIN = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password)
		return res.status(400).json({
			message: 'email and password are required',
		})

	const user = await User.findOne({
		where: {
			email,
		},
	})

	if (!user)
		return res.status(404).json({
			message: 'User not found',
		})

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch)
		return res.status(400).json({
			message: 'Invalid credentials',
		})

	const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
		expiresIn: '1h',
	})

	res.json({
		message: 'Successfully logged in',
		token,
	})
}

module.exports = {
	LOGIN,
	REGISTER,
}
