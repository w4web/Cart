const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product-controller');
const isAuth = require('../../middlewares/isAuth');
const { adminRole } = require('../../middlewares/role');

router.get('/', isAuth, adminRole, productController.getProducts);
router.get('/:productId', isAuth, adminRole, productController.getProduct);
router.post('/add', isAuth, adminRole, productController.addProduct);
router.put('/edit/:productId', isAuth, adminRole, productController.editProduct);
router.post('/delete', isAuth, adminRole, productController.deleteProduct);

module.exports = router;