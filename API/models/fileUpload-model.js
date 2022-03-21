const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileUploadSchema = new Schema({

    imageUrl: {
        type: String,
        required: true
    }
    
}, { timestamps: true })

module.exports = mongoose.model('fileUpload', fileUploadSchema);