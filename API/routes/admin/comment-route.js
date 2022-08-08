const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/admin/comment-controller');
const isAuth = require('../../middlewares/isAuth');
const { adminRole } = require('../../middlewares/role');

router.get('/', commentController.getComments);
router.get('/:commentId', commentController.getComment);
router.post('/add', isAuth, commentController.addComment);
router.put('/edit/:commentId', isAuth, adminRole, commentController.editComment);
router.post('/delete', isAuth, adminRole, commentController.deleteComment);

module.exports = router;