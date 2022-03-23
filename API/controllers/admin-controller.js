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
        console.log(err);
    })

}
