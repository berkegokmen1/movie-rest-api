// Npm Packages
const express = require('express');

// Load environment variables
require('dotenv').config();

// My imports
const sequelize = require('./util/database');
const User = require('./models/user.model');
const FavMovie = require('./models/favMovie.model');
const Token = require('./models/token.model');
const userRoutes = require('./routes/user.routes');
const moviesRoutes = require('./routes/movies.routes');
const { get404 } = require('./controllers/errors.controller');
const { logger, expressLogger } = require('./util/logger');

// Create express app
const app = express();
// parse application/x-www-form-urlencoded, application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Pino logger configuration
app.use(expressLogger);

// Routes
app.use('/user', userRoutes);
app.use('/movies', moviesRoutes);
app.use(get404);

// Declare relations
User.hasMany(FavMovie, { foreignKey: 'user_id' });
FavMovie.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Token, { foreignKey: 'user_id' });
Token.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

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
