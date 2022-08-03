const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    contentTypeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'contentType'
    }
    
}, { timestamps: true })

module.exports = mongoose.model('contents', contentSchema);