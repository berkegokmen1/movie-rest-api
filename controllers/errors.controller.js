const get404 = (req, res, next) => {
	res.status(404).json({
		error: 'Endpoint not found.',
	});
};

module.exports = { get404 };
