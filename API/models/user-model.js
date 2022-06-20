const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    profileImage: {
        type: String
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    verified: { 
        type: Boolean, 
        default: false 
    }
    
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema);