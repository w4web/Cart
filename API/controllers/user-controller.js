require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-model');
const StoredToken = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../util/sendEmail");

exports.register = (req, res, next) => {

    const { firstName, lastName, email, password } = req.body;

    bcrypt.hash(password, 10).then(hashPassword => {

        const userModel = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });

        userModel
            .save()
            .then(user => {

                const storedToken = new StoredToken({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                });

                storedToken.save().then(s_Token => {

                    const url = `${process.env.APP_URL}user/verifyEmail/${user.id}/${s_Token.token}`;

                    sendEmail(user.email, "Verify Email", url).then(() => {

                        res.status(201).json({
                            message: "An Email sent to your account please verify!"
                        })

                    })

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

exports.verifyEmail = (req, res, next) => {

    UserModel.findOne({ _id: req.params.id }).then(user => {

        if (!user) return res.status(401).send({ message: "Invalid link" });

        StoredToken.findOne({ userId: user._id, token: req.params.token }).then(s_Token => {

            if (!s_Token) return res.status(401).send({ message: "Invalid link" });

            user.updateOne({ _id: user._id, verified: true }).then(() => {

                s_Token.remove().then(() => {

                    res.status(200).send({ message: "Email verified successfully" });

                })

            })

        });

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};

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

                        if (user.verified && user.verified == true) {

                            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
                            res.status(201).json({
                                id: user._id,
                                firstName: user.firstName,
                                email: user.email,
                                token: token
                            })

                        } else {

                            StoredToken.findOne({ userId: user._id }).then(st_Token => {

                                if (!st_Token) {

                                    const storedToken = new StoredToken({
                                        userId: user._id,
                                        token: crypto.randomBytes(32).toString("hex"),
                                    });

                                    storedToken.save().then(s_Token => {

                                        const url = `${process.env.APP_URL}user/verifyEmail/${user.id}/${s_Token.token}`;

                                        sendEmail(user.email, "Verify Email", url).then(() => {

                                            return res.status(401).json({ summary: 'Email sent', detail: 'An Email sent to your account please verify' });

                                        });

                                    });

                                } else {

                                    return res.status(401).json({ summary: 'Email sent', detail: 'An Email sent to your account please verify' });
                                }

                            });

                        }

                    } else {

                        res.status(403).json({ summary: 'Invalid email/password', detail: 'Your entered email/password is Invalid' });

                    }

                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => console.log(err));

}

// Reset password

exports.passwordResetInit = (req, res, next) => {

    const { email } = req.body;

    UserModel.findOne({ email }).then(user => {

        if (!user) {
            res.status(409).json({ summary: 'Not exist', detail: 'User with given email does not exist!' });
        }

        StoredToken.findOne({ userId: user._id }).then(st_Token => {

            if (!st_Token) {

                const storedToken = new StoredToken({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex")
                });

                storedToken.save().then(s_Token => {

                    const url = `${process.env.APP_URL}user/passwordReset/${user._id}/${s_Token.token}`;

                    sendEmail(user.email, "Password Reset", url).then(() => {

                        return res.status(200).json({ summary: 'Email sent', detail: 'Password reset link sent to your email account' });

                    });

                });

            }

        });

    })
    .catch(err => console.log(err));

}

exports.passwordResetFinish = (req, res, next) => {

    UserModel.findOne({ _id: req.params.id }).then(user => {

        if (!user) return res.status(401).send({ message: "Invalid link" });

        StoredToken.findOne({ userId: user._id, token: req.params.token }).then(s_Token => {

            if (!s_Token) return res.status(401).send({ message: "Invalid link" });

            const { password } = req.body;

            bcrypt.hash(password, 10).then(hashPassword => {

                user.updateOne({ _id: user._id, password: hashPassword, verified: true }).then(() => {

                    s_Token.remove().then(() => {
    
                        res.status(200).send({ message: "Password reset successfully" });
    
                    })
    
                })

            }).catch(err => {
                console.log(err);
            });

        });

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};










exports.changePassword = (req, res, next) => {

    const { newPassword } = req.body;

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
