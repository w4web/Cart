const express = require('express');
const router = express.Router();
const contentController = require('../../controllers/admin/content-controller');
const isAuth = require('../../middlewares/isAuth');
const { adminRole } = require('../../middlewares/role');

router.get('/', isAuth, adminRole, contentController.getContents);
router.get('/:contentId', isAuth, adminRole, contentController.getContent);
router.post('/add', isAuth, adminRole, contentController.addContent);
router.put('/edit/:contentId', isAuth, adminRole, contentController.editContent);
router.post('/delete', isAuth, adminRole, contentController.deleteContent);

module.exports = router;