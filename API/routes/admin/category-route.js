const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/category-controller');
const isAuth = require('../../middlewares/isAuth');
const { adminRole } = require('../../middlewares/role');

router.get('/', isAuth, adminRole, categoryController.getCategories);
router.get('/:categoryId', isAuth, adminRole, categoryController.getCategory);
router.post('/add', isAuth, adminRole, categoryController.addCategory);
router.put('/edit/:categoryId', isAuth, adminRole, categoryController.editCategory);
router.post('/delete', isAuth, adminRole, categoryController.deleteCategory);

module.exports = router;