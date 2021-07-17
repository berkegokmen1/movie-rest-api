const express = require('express');
const path = require('path');

const sequelize = require('./util/database');

const app = express();

app.use(express.urlencoded({ extended: false }));

sequelize
	.sync()
	.then((_) => {
		app.listen(process.env.PORT || 3000, () => {
			console.log('Server is up and running on port', process.env.PORT);
		});
	})
	.catch((e) => console.log(e));
