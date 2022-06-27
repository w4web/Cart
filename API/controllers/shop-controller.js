const ProductModel = require('../models/product-model');
const CategoryModel = require('../models/category-model');
const { treeView } = require("../util/logic");

// All product

exports.getProducts = (req, res, next) => {

    const filter = {};

    if(req.query.category != "undefined") {
        filter.subCategory = req.query.category;
    }

    ProductModel.find(filter)
    
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

// All category

exports.getCategories = (req, res, next) => {

    CategoryModel.find()
        .then(categories => {
            if (categories) {
                const categoryTree = treeView(categories);
                res.status(200).json({
                    tree: categoryTree,
                    list: categories
                });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

// Single category

exports.getCategory = (req, res, next) => {

    const categoryId = req.params.categoryId;

    CategoryModel.findById(categoryId)
        .then(category => {

            if (!category) {
                return res.status(404).json({ summary: 'Not found!', detail: 'Could not find category!' });
            }

            res.status(200).json(category);

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}
