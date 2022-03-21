const express = require('express');
const adminController = require('../controllers/admin-controller');
const fileUploadController = require('../controllers/fileUpload-controller');

const router = express.Router();

router.post('/uploadFile', fileUploadController.uploadFile);

router.get('/products', adminController.getProducts);

router.post('/product/add', adminController.addProduct);

module.exports = router;