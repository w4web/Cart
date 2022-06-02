const express = require('express');
const myAccountController = require('../controllers/myAccount-controller');
const router = express.Router();

const isAuth = require('../auth/isAuth');

// router.post('/register', myAccountController.register);

router.put('/changePassword', isAuth, myAccountController.changePassword);

module.exports = router;