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

                    const url = `${process.env.APP_URL}users/${user.id}/verify/${s_Token.token}`;

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

exports.verifyEmail = async (req, res, next) => {

    try {

        const user = await UserModel.findOne({ _id: req.params.id });

        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await StoredToken.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(400).send({ message: "Invalid link" });

        await User.updateOne({ _id: user._id, verified: true });

        await token.remove();

        res.status(200).send({ message: "Email verified successfully" });

    } catch (error) {

        res.status(500).send({ message: "Internal Server Error" });

    }

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

                        // Check for email varification

                        if (!user.verified) {

                            StoredToken.findOne({ userId: user._id }).then(st_Token => {

                                if (!st_Token) {

                                    const storedToken = new StoredToken({
                                        userId: user._id,
                                        token: crypto.randomBytes(32).toString("hex"),
                                    });

                                    storedToken.save().then(s_Token => {

                                        const url = `${process.env.APP_URL}users/${user.id}/verify/${s_Token.token}`;

                                        sendEmail(user.email, "Verify Email", url).then(() => {

                                            return res
                                                .status(400)
                                                .send({ message: "An Email sent to your account please verify" });

                                        });

                                    });
                                }

                            });
                        }

                        // -----------

                        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
                        res.status(201).json({
                            id: user._id,
                            firstName: user.firstName,
                            email: user.email,
                            token: token
                        })

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
