const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true,
    trim: true,
  },
  parentId: {
    type: String,
  },
  contentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'contents'
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  }
}, { timestamps: true });

module.exports = mongoose.model("comment", commentSchema);