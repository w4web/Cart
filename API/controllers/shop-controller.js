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
