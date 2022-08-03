const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentTypeSchema = new Schema({
  label: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String
  },
  routerLink: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("contentType", contentTypeSchema);