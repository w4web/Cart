const ProductModel = require('../models/product-model');

exports.getProducts = (req, res, next) => {

    ProductModel.find()
    .then(result => {
        res.status(200).json({
            message: "Fetched products successfully..",
            data: result
        })
    })
    .catch(err => {
        console.log(err);
    })

}

exports.addProduct = (req, res, next) => {

    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;

    const productModel = new ProductModel({
        title: title,
        content: content,
        imageUrl: imageUrl,
        price: price
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
        console.log(err);
    })

}
