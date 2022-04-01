const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();

const isAuth = require('../auth/isAuth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/change-password', isAuth, userController.changePassword);

module.exports = router;