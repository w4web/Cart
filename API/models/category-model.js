const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String
  },
  parentId: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("category", categorySchema);