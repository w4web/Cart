const express = require('express');
const shopController = require('../controllers/shop-controller');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/categories', shopController.getCategories);

router.get('/categories/:categoryId', shopController.getCategory);

// Cart & orders

router.get('/cart', isAuth, shopController.getCart);

router.get('/cartQuantity', isAuth, shopController.cartQuantity);

router.post('/cart/add', isAuth, shopController.postCart);

router.post('/cart/editQuantity', isAuth, shopController.editQuantity);

router.post('/cart/delete', isAuth, shopController.cartDeleteProduct);

router.get('/checkout', isAuth, shopController.getCheckout);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

module.exports = router;