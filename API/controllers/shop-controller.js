const ProductModel = require('../models/product-model');
const CategoryModel = require('../models/category-model');
const UserModel = require('../models/user-model');
const Order = require('../models/order-model');
const { treeView } = require("../util/logic");

// All product

exports.getProducts = (req, res, next) => {

    let page = 1;
    let totalItems;
    const ITEMS_PER_PAGE = 10;
    const filter = {};

    if (req.query.page != "undefined") {
        page = req.query.page;
    }

    if (req.query.category != "undefined") {
        filter.subCategory = req.query.category;
    }

    ProductModel.find(filter)
        .count()
        .then(numProducts => {
            totalItems = numProducts;
            return ProductModel.find(filter)
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);
        })
        .then(products => {
            res.status(200).json({
                message: "Fetched products successfully..",
                data: products,
                totalProducts: totalItems,
                productsPerPage: ITEMS_PER_PAGE,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
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

// Cart & orders

exports.getCart = (req, res, next) => {

    let products;
    let totalQuantity = 0;
    let total = 0;

    const _id = req.user.id;

    UserModel.findById(_id).then(user => {

        user
        .populate('cart.items.productId')
        .then(user => {

            products = user.cart.items;
            products.forEach(p => {
                totalQuantity += p.quantity;
                total += p.quantity * p.productId.price;
            });
            res.status(200).json({
                products: products,
                totalQuantity: totalQuantity,
                totalSum: total,
            });
            
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.cartQuantity = (req, res, next) => {

    let totalQuantity = 0;

    const _id = req.user.id;

    UserModel.findById(_id).then(user => {

        products = user.cart.items;
        products.forEach(p => {
            totalQuantity += p.quantity;
        });
        res.status(200).json({totalQuantity: totalQuantity});

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.postCart = (req, res, next) => {

    const prodId = req.body.productId;
    const quantity = req.body.quantity;

    const _id = req.user.id;

    UserModel.findById(_id).then(user => {

        ProductModel.findById(prodId)
            .then(product => {
                return user.addToCart(product, quantity);
            })
            .then(result => {
                res.status(201).json(result);
            })
            .catch(error => {

                if (error.name === "ValidationError") {
                    // let errors = {};
                    let vError = "";

                    Object.keys(error.errors).forEach((key) => {
                        // errors[key] = error.errors[key].message;
                        vError = error.errors[key].message;
                    });

                    return res.status(422).json({vError});
                }

                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            });

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.editQuantity = (req, res, next) => {

    const prodId = req.body.productId;
    const quantity = req.body.quantity;

    const _id = req.user.id;

    UserModel.findById(_id).then(user => {

        return user.editQuantity(prodId, quantity);

    }).then(result => {

        res.status(201).json(result);

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.cartDeleteProduct = (req, res, next) => {

    const _id = req.user.id;
    const prodId = req.body.productId;

    UserModel.findById(_id).then(user => {

        user.removeFromCart(prodId).then(result => {

            res.status(201).json(result);
            
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.getCheckout = (req, res, next) => {

    let products;
    let total = 0;

    const _id = req.user.id;

    UserModel.findById(_id).then(user => {

        user
        .populate('cart.items.productId')
        .then(user => {
            products = user.cart.items;
            products.forEach(p => {
                total += p.quantity * p.productId.price;
            });
            res.status(200).json({
                products: products,
                totalSum: total,
            });
        })
        .catch(err => console.log(err));

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

    
};

exports.postOrder = (req, res, next) => {

    const _id = req.user.id;

    UserModel.findById(_id).then(user => {

        user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user.id
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return user.clearCart();
        })
        .then(() => {
            res.status(201).json({ message: "Order successful" });
        })
        .catch(err => console.log(err));

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user.id })
        .then(orders => {
            res.status(200).json(orders);
        })
        .catch(err => console.log(err));
};