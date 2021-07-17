const express = require('express');
const router = express.Router();

const {
	postLogin,
	postRegister,
	postLogout,
} = require('../controllers/user.controller');
const checkAuth = require('../middleware/checkAuth');

router.post('/login', postLogin);
router.post('/register', postRegister);
router.post('/logout', checkAuth, postLogout);

module.exports = router;
