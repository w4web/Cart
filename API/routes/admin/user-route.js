const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/user-controller');
const isAuth = require('../../middlewares/isAuth');
const { adminRole } = require('../../middlewares/role');

router.get('/', isAuth, adminRole, userController.getUsers);
router.get('/:userId', isAuth, adminRole, userController.getUser);
router.post('/add', isAuth, adminRole, userController.addUser);
router.put('/edit/:userId', isAuth, adminRole, userController.editUser);
router.post('/delete', isAuth, adminRole, userController.deleteUser);

module.exports = router;