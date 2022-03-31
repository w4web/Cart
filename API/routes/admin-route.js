const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');

router.get('/products', adminController.getProducts);
router.get('/product/:productId', adminController.getProduct);
router.post('/product/add', adminController.addProduct);
router.put('/product/edit/:productId', adminController.editProduct);
router.post('/product/delete', adminController.deleteProduct);

module.exports = router;