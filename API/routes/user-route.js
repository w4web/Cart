const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();

router.post('/register', userController.register);
router.get('/verifyEmail/:id/:token', userController.verifyEmail);
router.post('/login', userController.login);

router.post('/passwordResetInit', userController.passwordResetInit);
router.post('/passwordResetFinish/:id/:token', userController.passwordResetFinish);

module.exports = router;