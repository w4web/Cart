const express = require('express');
const server = express();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const connectionString = "mongodb+srv://manish:2VqFMEw4xxshrT8F@cluster0.80yfn.mongodb.net/MyCart?retryWrites=true&w=majority"
const shopRoutes = require('./routes/shop-route');
const adminRoutes = require('./routes/admin-route');
const imageUpload = require('./util/image-upload');

// Middlewares

server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));
server.use(multer({ 
    storage: imageUpload.fileStorage, 
    fileFilter: imageUpload.fileFilter 
}).single('image'));

// Routes

server.use('/admin', adminRoutes);
server.use(shopRoutes);

// Connection

mongoose.connect(connectionString).then( result => { 
    server.listen(5000);
}).catch(err => { 
    console.log(err);
});