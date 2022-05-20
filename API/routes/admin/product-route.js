const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product-controller');

router.get('/', productController.getProducts);
router.get('/:productId', productController.getProduct);
router.post('/add', productController.addProduct);
router.put('/edit/:productId', productController.editProduct);
router.post('/delete', productController.deleteProduct);

module.exports = router;