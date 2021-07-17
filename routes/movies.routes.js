const express = require('express');
const router = express.Router();

const {
	getMovies,
	getMoviesTitle,
	getMoviesFavourite,
	postMoviesFavourite,
} = require('../controllers/movies.controller');
const checkAuth = require('../middleware/checkAuth');

router.get('/', getMovies);
router.get('/favourite', checkAuth, getMoviesFavourite);
router.get('/:title', getMoviesTitle);
router.post('/favourite', checkAuth, postMoviesFavourite);

module.exports = router;
