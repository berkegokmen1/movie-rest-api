const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST || 'localhost',
		dialect: 'mysql',
		logging: false, // Set to true if SQL commands should be printed to console
	}
);

module.exports = sequelize;
