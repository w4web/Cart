require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-model');

exports.register = (req, res, next) => {

    const { firstName, lastName, email, password } = req.body;

    bcrypt.hash(password, 10).then( hashPassword => {

        const userModel = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });
    
        userModel
        .save()
        .then(result => {
            res.status(201).json({
                message: "User created..",
                data: result
            })
        })
        .catch(err => {
            if (err.code === 11000) {
                res.status(409).json({ summary: 'Email already in use', detail: 'Your entered email is already in use!' });
            }
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

exports.login = (req, res, next) => {

    const { email, password } = req.body;

    UserModel.findOne({ email })
    .then(user => {

      if (!user) {
        res.status(403).json({ summary: 'Invalid email/password', detail: 'Your entered email/password is Invalid' });
      }

      bcrypt
        .compare(password, user.password)
        .then(doMatch => {

          if (doMatch) {
            const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET);
            res.status(201).json({
                message: "logged in..",
                data: {
                    id: user._id, 
                    email: user.email,
                    token: token
                }
            })
          }

          res.status(403).json({ summary: 'Invalid email/password', detail: 'Your entered email/password is Invalid' });

        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));

}

exports.changePassword = (req, res, next) => {

    const { newPassword } = req.body;

    const _id = req.user.id;

    bcrypt.hash(newPassword, 10).then( newHashPassword => {

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