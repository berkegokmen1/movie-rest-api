const jwt = require('jsonwebtoken');
const { logger } = require('../util/logger');
const User = require('../models/user.model');

const checkAuth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findByPk(decoded.user_id);

		if (!user) {
			return res
				.status(500)
				.json({ error: 'Something went wrong. Please try again.' });
		}

		const tokens = await user.getTokens({ where: { tokenValue: token } });

		if (tokens.length <= 0) {
			return res.status(403).json({ error: 'Invalid or expired token.' });
		}

		req.token = token;
		req.user = user;
		next();
	} catch (err) {
		logger.error(err);
		return res.status(403).json({ error: 'Please authenticate.' });
	}
};

module.exports = checkAuth;
