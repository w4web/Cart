const bcrypt = require('bcryptjs');
const UserModel = require('../../models/user-model');

// All user

exports.getUsers = (req, res, next) => {

    UserModel.find()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

}

// Single user

exports.getUser = (req, res, next) => {

    const userId = req.params.userId;

    UserModel.findById(userId)
    .then(user => {
        if (!user) {
            return res.status(404).json({ summary: 'Not found!', detail: 'Could not find user!' });
        }
        res.status(200).json(user);
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}

// Add user

exports.addUser = (req, res, next) => {

    const { profileImage, firstName, lastName, email, password, role, verified } = req.body;

    bcrypt.hash(password, 10).then(hashPassword => {

        const userModel = new UserModel({
            profileImage,
            firstName,
            lastName,
            email,
            password: hashPassword,
            role,
            verified
        });

        userModel
        .save()
        .then(user => {

            res.status(201).json(user);

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

// Edit user

exports.editUser = (req, res, next) => {

    const userId = req.params.userId;

    const { profileImage, firstName, lastName, email, password, role, verified } = req.body;

    bcrypt.hash(password, 10).then(hashPassword => {

        UserModel.findById(userId).then(user => {
        
            if (!user) {
                return res.status(404).json({ summary: 'Not found!', detail: 'Could not find user!' });
            }
    
            user.profileImage = profileImage;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = hashPassword;
            user.role = role;
            user.verified = verified;
    
            return user.save();
        })
        .then(result => {
            res.status(201).json(result);
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

// Delete user

exports.deleteUser = (req, res, next) => {

    const userId = req.body.userId;

    UserModel.findByIdAndRemove(userId).then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}