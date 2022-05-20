const ProductModel = require('../../models/product-model');

// All product

exports.getProducts = (req, res, next) => {

    ProductModel.find()
    .then(result => {
        res.status(200).json({
            message: "Fetched products successfully..",
            data: result
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

}

// Single product

exports.getProduct = (req, res, next) => {

    const productId = req.params.productId;

    ProductModel.findById(productId)
    .then(product => {
        if (!product) {
            const error = new Error('Could not find product.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "Product fetched..",
            data: product
        })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}

// Add product

exports.addProduct = (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const price = req.body.price;
    const category = req.body.category;

    const productModel = new ProductModel({
        name: name,
        description: description,
        image: image,
        price: price,
        category: category
    });

    productModel
    .save()
    .then(result => {
        res.status(201).json({
            message: "Your product is added successfully..",
            data: productModel
        })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}

// Edit product

exports.editProduct = (req, res, next) => {

    const productId = req.params.productId;

    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const price = req.body.price;
    const category = req.body.category;
    
    ProductModel.findById(productId).then(product => {
        
        if (!product) {
          const error = new Error('Could not find product..');
          error.statusCode = 404;
          throw error;
        }

        product.name = name;
        product.description = description;
        product.image = image;
        product.price = price;
        product.category = category;

        return product.save();
    })
    .then(result => {
        res.status(201).json({
            message: "product updated..",
            data: result
        })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}

// Delete product

exports.deleteProduct = (req, res, next) => {

    const productId = req.body.productId;

    ProductModel.findByIdAndRemove(productId).then(result => {
        res.status(201).json({
            message: "product deleted..",
            data: result
        })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}