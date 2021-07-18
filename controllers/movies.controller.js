const { logger } = require('../util/logger');
const axios = require('axios').default;

const getMovies = (req, res, next) => {
	return res.status(403).json({
		error: 'Forbidden',
	});
};

const getMoviesTitle = async (req, res, next) => {
	try {
		const title = req.params.title.split(' ').join('+');
		const result = await axios.get(
			`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`
		);
		if (result.data.Response === 'False') {
			return res.json({ error: 'Movie not found.' });
		}

		return res.json({
			title: result.data.Title,
			poster: result.data.Poster,
			error: undefined,
		});
	} catch (err) {
		logger.error(err);
		return res
			.status(500)
			.json({ error: 'Something went wrong. Please try again.' });
	}
};

const getMoviesFavourite = async (req, res, next) => {
	try {
		const favMovies = await req.user.getFavourite_movies();
		const favMoviesModified = favMovies.map((m) => {
			return { title: m.title, posterUrl: m.posterUrl };
		});

		res.set('Content-Type', 'application/json; charset=utf-8');
		res.cookie('access_token', 'Bearer ' + req.token, {
			expires: new Date(Date.now() + 3600000), // cookie will be removed after 1 hour
		});
		res.setHeader(
			'Set-Cookie',
			'session_id=123456; Max-Age=3600; HttpOnly, Secure'
		);
		return res.json(favMoviesModified);
	} catch (err) {
		logger.error(err);
		return res
			.status(500)
			.json({ error: 'Something went wrong. Please try again.' });
	}
};

const postMoviesFavourite = async (req, res, next) => {
	try {
		const data = await axios.get(
			`http://${
				process.env.BASE_URL || `localhost:${process.env.PORT}`
			}/movies/${req.body.title}`
		);

		if (data.data.error) {
			return res.json({ error: 'Movie not found.' });
		}

		await req.user.createFavourite_movie({
			title: data.data.title,
			posterUrl: data.data.poster,
		});

		return res.status(201).json({
			info: `Movie ${data.data.title} has been added`,
		});
	} catch (err) {
		logger.error(err);
		return res
			.status(500)
			.json({ error: 'Something went wrong. Please try again.' });
	}
};

module.exports = {
	getMovies,
	getMoviesTitle,
	getMoviesFavourite,
	postMoviesFavourite,
};
