const express = require('express');
const router = express.Router();
const myAccountController = require('../controllers/myAccount-controller');
const isAuth = require('../middlewares/isAuth');

router.get('/', isAuth, myAccountController.getAccount);
router.put('/edit', isAuth, myAccountController.editAccount);
router.put('/editProfileImage', isAuth, myAccountController.editProfileImage);

router.get('/address', isAuth, myAccountController.getAddress);
router.put('/address/edit', isAuth, myAccountController.editAddress);

router.put('/changePassword', isAuth, myAccountController.changePassword);

module.exports = router;