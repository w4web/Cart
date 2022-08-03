const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentTypeSchema = new Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("contentType", contentTypeSchema);