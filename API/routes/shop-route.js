const express = require('express');
const shopController = require('../controllers/shop-controller');
const router = express.Router();

router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/categories', shopController.getCategories);
router.get('/categories/:categoryId', shopController.getCategory);

module.exports = router;