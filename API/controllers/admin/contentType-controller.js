const ContentTypeModel = require('../../models/contentType-model');
const ContentModel = require('../../models/content-model');

// All ContentType

exports.getContentTypes = (req, res, next) => {

    ContentTypeModel.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

}

// Single contentType

exports.getContentType = (req, res, next) => {

    const contentTypeId = req.params.contentTypeId;

    ContentTypeModel.findById(contentTypeId)
    .then(contentType => {
        if (!contentType) {
            return res.status(404).json({ summary: 'Not found!', detail: 'Could not find contentType!' });
        }
        res.status(200).json(contentType)
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}

// Add contentType

exports.addContentType = (req, res, next) => {

    const label = req.body.label;
    const icon = req.body.icon;
    const routerLink = req.body.routerLink;

    const contentTypeModel = new ContentTypeModel({
        label: label,
        icon: icon,
        routerLink: routerLink
    });

    contentTypeModel
    .save()
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}

// Edit contentType

exports.editContentType = (req, res, next) => {

    const contentTypeId = req.params.contentTypeId;

    const label = req.body.label;
    const icon = req.body.icon;
    const routerLink = req.body.routerLink;
    
    ContentTypeModel.findById(contentTypeId).then(contentType => {
        
        if (!contentType) {
            return res.status(404).json({ summary: 'Not found!', detail: 'Could not find contentType!' });
        }

        contentType.label = label;
        contentType.icon = icon;
        contentType.routerLink = routerLink;

        return contentType.save();
    })
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}

// Delete contentType

exports.deleteContentType = (req, res, next) => {

    const contentTypeId = req.body.contentTypeId;

    ContentTypeModel.findByIdAndRemove(contentTypeId).then(() => {

        ContentModel.find({ 'contentTypeId': contentTypeId }).then(contents => {

            if (contents) {
                contents.forEach((content) => {
                    content.contentTypeId = undefined;
                })
            }
    
            return contents.save();
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });

    })
    .then(() => {
        res.status(201).json({message: "ContentType deleted.."});
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}