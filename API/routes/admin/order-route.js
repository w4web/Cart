const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/order-controller');
const isAuth = require('../../middlewares/isAuth');
const { adminRole } = require('../../middlewares/role');

router.get('/', isAuth, adminRole, orderController.getOrders);
// router.get('/:orderId', isAuth, adminRole, orderController.getOrder);

module.exports = router;