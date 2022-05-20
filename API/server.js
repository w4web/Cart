const express = require('express');
const server = express();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fileUpload = require('./util/file-upload');
const connectionString = "mongodb+srv://manish:2VqFMEw4xxshrT8F@cluster0.80yfn.mongodb.net/MyCart?retryWrites=true&w=majority"
const shopRoutes = require('./routes/shop-route');
const userRoutes = require('./routes/user-route');
const myAccountRoutes = require('./routes/myAccount-route');

// admin routes

const productRoutes = require('./routes/admin/product-route');

const fileUploadController = require('./controllers/fileUpload-controller');
const myFile = multer({ storage: fileUpload.fileStorage }).single('file');

global.baseUrl = "http://localhost:5000/";

// Middlewares

server.use(express.json());
server.use('/public', express.static('public'));

// Routes

server.post('/uploadFile', myFile, fileUploadController.uploadFile);
server.use('/admin/products', productRoutes);
server.use('/user', userRoutes);
server.use('/myAccount', myAccountRoutes);
server.use(shopRoutes);

// Connection

mongoose.connect(connectionString).then( result => { 
    server.listen(5000);
}).catch(err => { 
    console.log(err);
});