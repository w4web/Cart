const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String
    },
    description: {
        type: String,
        required: true
    }
    
}, { timestamps: true })

module.exports = mongoose.model('products', productSchema);