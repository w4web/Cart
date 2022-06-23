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
            return res.status(404).json({ summary: 'Not found!', detail: 'Could not find product!' });
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

    const image = req.body.image;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const subCategory = req.body.subCategory;
    const description = req.body.description;

    const productModel = new ProductModel({
        image: image,
        name: name,
        price: price,
        category: category,
        subCategory: subCategory,
        description: description
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

    const image = req.body.image;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const subCategory = req.body.subCategory;
    const description = req.body.description;
    
    ProductModel.findById(productId).then(product => {
        
        if (!product) {
            return res.status(404).json({ summary: 'Not found!', detail: 'Could not find product!' });
        }

        product.image = image;
        product.name = name;
        product.price = price;
        product.category = category;
        product.subCategory = subCategory;
        product.description = description;

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