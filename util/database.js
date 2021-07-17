const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
	host: process.env.DB_HOST || "localhost",
	dialect: 'mysql',
});

module.exports = sequelize;
