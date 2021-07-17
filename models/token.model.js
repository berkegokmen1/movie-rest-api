const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../util/database');

const Token = sequelize.define(
	'token',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		tokenValue: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = Token;
