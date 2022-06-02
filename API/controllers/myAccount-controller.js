require('dotenv').config();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user-model');

exports.changePassword = (req, res, next) => {

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.password;
    const _id = req.user.id;

    UserModel.findById(_id).then(user => {
        bcrypt.compare(oldPassword, user.password).then(doMatch => {
            if (doMatch == false) {
                res.status(403).json({ summary: 'Incorrect', detail: 'Incorrect old password!' });
            } else {
                bcrypt.hash(newPassword, 10).then(newHashPassword => {
                    user.password = newHashPassword;
                    user.save().then(() => {
                        res.status(201).json({ summary: 'Changed', detail: 'Password changed!' });
                    }).catch(err => {
                        console.log(err);
                    });
                });
            }
        })
    });

}
