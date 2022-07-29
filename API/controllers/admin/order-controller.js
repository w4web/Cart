const Order = require('../../models/order-model');

exports.getOrders = (req, res, next) => {

    Order.find()
    .then(orders => {
        res.status(200).json(orders);
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};