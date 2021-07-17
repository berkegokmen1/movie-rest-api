const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { logger } = require('../util/logger');
const jwt = require('jsonwebtoken');
const Token = require('../models/token.model');

const postLogin = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { name: req.body.name } });
		if (!user) {
			return res.status(404).json({ error: 'Invalid credentials.' });
		}

		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			return res.status(404).json({ error: 'Invalid credentials.' });
		}

		const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});
		await user.createToken({ tokenValue: token });

		return res.status(200).json({ name: user.name, token });
	} catch (err) {
		logger.error(err);
		return res
			.status(500)
			.json({ error: 'Something went wrong. Please try again.' });
	}
};

const postRegister = async (req, res, next) => {
	try {
		let user = await User.findOne({ where: { name: req.body.name } });
		if (user) {
			return res.status(406).json({ error: 'Username is already in use.' });
		}

		const hashedPass = await bcrypt.hash(req.body.password, 8);

		user = await User.create({
			name: req.body.name,
			password: hashedPass,
		});

		const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});
		await user.createToken({ tokenValue: token });

		return res.status(201).json({ name: user.name, token });
	} catch (err) {
		logger.error(err);
		return res
			.status(500)
			.json({ error: 'Something went wrong. Please try again.' });
	}
};

const postLogout = async (req, res, next) => {
	try {
		const tokens = await req.user.getTokens();
		tokens.forEach(async (token) => {
			await token.destroy();
		});
		return res.status(200).json({ info: 'Logged out.' });
	} catch (err) {
		logger.error(err);
		return res
			.status(500)
			.json({ error: 'Something went wrong. Please try again.' });
	}
};

module.exports = {
	postLogin,
	postLogout,
	postRegister,
};
