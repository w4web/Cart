require('dotenv').config();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user-model');



exports.changePassword = (req, res, next) => {

    const newPassword = req.body.password;

    const _id = req.user.id;

    bcrypt.hash(newPassword, 10).then(newHashPassword => {

        UserModel.findById(_id).then(user => {

            user.password = newHashPassword;

            return user.save();
        })
            .then(result => {
                res.status(201).json({
                    message: "Password changed..",
                    data: result
                })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });

    })
        .catch(err => {
            console.log(err);
        });

}
