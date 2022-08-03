const express = require('express');
const router = express.Router();
const contentTypeController = require('../../controllers/admin/contentType-controller');
const isAuth = require('../../middlewares/isAuth');
const { adminRole } = require('../../middlewares/role');

router.get('/', isAuth, adminRole, contentTypeController.getContentTypes);
router.get('/:contentTypeId', isAuth, adminRole, contentTypeController.getContentType);
router.post('/add', isAuth, adminRole, contentTypeController.addContentType);
router.put('/edit/:contentTypeId', isAuth, adminRole, contentTypeController.editContentType);
router.post('/delete', isAuth, adminRole, contentTypeController.deleteContentType);

module.exports = router;