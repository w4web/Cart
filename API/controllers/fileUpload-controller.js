const FileUploadModel = require('../models/fileUpload-model');

exports.uploadFile = (req, res, next) => {

    if (!req.file) {
        const error = new Error('No file provided.');
        error.statusCode = 422;
        throw error;
    }

    const fileUrl = req.file.path;

    const fileUploadModel = new FileUploadModel({
        file: fileUrl
    });

    fileUploadModel
    .save()
    .then(result => {
        res.status(201).json(fileUploadModel);
    })
    .catch(err => {
        console.log(err);
    })

}