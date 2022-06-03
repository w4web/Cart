require('dotenv').config();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user-model');
const AddressModel = require('../models/address-model');

exports.getAccount = (req, res, next) => {

    const _id = req.user.id;

    UserModel.findById(_id).then(user => {

        res.status(200).json(user);

    }).catch(err => {

        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
        
    });

}

exports.editAccount = (req, res, next) => {

    const _id = req.user.id;

    UserModel.findById(_id).then(user => {
        
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;

        return user.save();

    }).then(result => {

        res.status(201).json(result);

    }).catch(err => {

        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);

    });

}

exports.editProfileImage = (req, res, next) => {

    const _id = req.user.id;

    UserModel.findById(_id).then(user => {
        
        user.profileImage = req.body.profileImage;

        return user.save();

    }).then(result => {

        res.status(201).json(result);

    }).catch(err => {

        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);

    });

}

// Address

exports.getAddress = (req, res, next) => {

    const _id = req.user.id;

    AddressModel.findOne({ userId: _id }).then(address => {

        if (!address) {
            return res.status(409).json({ summary: 'Empty', detail: 'Address is not available!' });
        }

        res.status(200).json(address);

    }).catch(err => {

        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
        
    });

}

exports.editAddress = (req, res, next) => {

    const _id = req.user.id;
    const { customerName, street, city, zip, phone } = req.body;

    AddressModel.findOne({ userId: _id }).then(address => {

        if (!address) {
            
            const addressModel = new AddressModel({
                userId: _id,
                customerName,
                street,
                city,
                zip,
                phone
            });

            addressModel.save().then(() => {
                res.status(201).json({ summary: 'Created', detail: 'Address created!' });
            }).catch(err => {
                console.log(err);
            });

        } else {

            address.customerName = customerName;
            address.street = street;
            address.city = city;
            address.zip = zip;
            address.phone = phone;

            address.save().then(() => {
                res.status(201).json({ summary: 'Updated', detail: 'Address Updated!' });
            }).catch(err => {
                console.log(err);
            });

        }

    }).catch(err => {

        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
        
    });

}

// Change password

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
