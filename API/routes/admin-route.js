const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');

router.get('/products', adminController.getProducts);
router.post('/product/add', adminController.addProduct);

module.exports = router;