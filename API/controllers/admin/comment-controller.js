const CommentModel = require('../../models/comment-model');
const { commentTreeView } = require("../../util/logic");

// All comment

exports.getComments = (req, res, next) => {

    const filter = {};

    if (req.query.contentId != "undefined") {
        filter.contentId = req.query.contentId;
    }

    CommentModel.find(filter)
        .then(comments => {
            if (comments) {
                const commentTree = commentTreeView(comments);
                res.status(200).json({
                    tree: commentTree,
                    list: comments
                });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

// Single comment

exports.getComment = (req, res, next) => {

    const commentId = req.params.commentId;

    CommentModel.findById(commentId)
        .then(comment => {

            if (!comment) {
                return res.status(404).json({ summary: 'Not found!', detail: 'Could not find comment!' });
            }

            res.status(200).json(comment);

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

// Add comment

exports.addComment = (req, res, next) => {

    const commentText = req.body.commentText;
    const parentId = req.body.parentId;
    const contentId = req.body.contentId;
    const userId = req.body.userId;

    const commentModel = new CommentModel({
        commentText: commentText,
        parentId: parentId,
        contentId: contentId,
        userId: userId
    });

    commentModel
        .save()
        .then(comment => {
            res.status(201).json(comment);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

// Edit comment

exports.editComment = (req, res, next) => {

    const commentId = req.params.commentId;
    const commentText = req.body.commentText;

    CommentModel.findById(commentId)
        .then(comment => {

            if (!comment) {
                return res.status(404).json({ summary: 'Not found!', detail: 'Could not find comment!' });
            }

            comment.commentText = commentText;
            return comment.save();

        }).then(result => {

            res.status(201).json(result);

        }).catch(err => {

            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            
        });

}

// Delete comment

exports.deleteComment = (req, res, next) => {

    const commentId = req.body.commentId;

    CommentModel.findByIdAndRemove(commentId)
        .then(result => {
            res.status(201).json({
                message: "comment deleted..",
                data: result
            })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}