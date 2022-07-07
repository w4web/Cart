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

// ***** Authentication removed for un-Authenticated applications *****

// router.get('/', productController.getProducts);
// router.get('/:productId', productController.getProduct);
// router.post('/add', productController.addProduct);
// router.put('/edit/:productId', productController.editProduct);
// router.post('/delete', productController.deleteProduct);

module.exports = router;