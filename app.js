// Npm Packages
const express = require('express');
const pino = require('pino');
const expressPino = require('express-pino-logger');

// My imports
const sequelize = require('./util/database');
const User = require('./models/user.model');
const favMovie = require('./models/favMovie.model');

// Pino logger configuration
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

// Create express app
const app = express();

// For logging
app.use(expressLogger);

// Declare relations
User.hasMany(favMovie, { foreignKey: 'user_id' });
favMovie.belongsTo(User, { foreignKey: 'user_id' });

// Initialize sequelize and mysql database
sequelize
	// .sync({ force: true }) // Uncomment this when tables need to change
	.sync()
	.then((_) => {
		app.listen(process.env.PORT || 3000, () => {
			logger.info(`Server is up and running on port ${process.env.PORT}`);
		});
	})
	.catch((e) => logger.error(e));

// Export logger
module.exports = { logger };
