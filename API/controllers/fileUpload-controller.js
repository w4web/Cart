const FileUploadModel = require('../models/fileUpload-model');

exports.uploadFile = (req, res, next) => {

    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }

    const imageUrl = req.file.path;

    const fileUploadModel = new FileUploadModel({
        imageUrl: imageUrl
    });

    fileUploadModel
    .save()
    .then(result => {
        res.status(201).json({
            message: "Your image is added successfully..",
            data: fileUploadModel
        })
    })
    .catch(err => {
        console.log(err);
    })

}