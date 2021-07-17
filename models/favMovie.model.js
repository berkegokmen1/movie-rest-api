const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../util/database');

const favMovie = sequelize.define(
	'favourite_movie',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = favMovie;
