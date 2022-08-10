const ContentModel = require('../../models/content-model');

// All content

exports.getContents = (req, res, next) => {

    const filter = {contentTypeId: undefined};

    if (req.query.contentTypeId != "undefined") {
        filter.contentTypeId = req.query.contentTypeId;
    }

    ContentModel.find(filter)
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

// Single content

exports.getContent = (req, res, next) => {

    const contentId = req.params.contentId;

    ContentModel.findById(contentId)
    .then(content => {
        if (!content) {
            return res.status(404).json({ summary: 'Not found!', detail: 'Could not find content!' });
        }
        res.status(200).json(content)
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}

// Get content by slug

exports.getContentBySlug = (req, res, next) => {

    const slug = req.params.slug;

    ContentModel.findOne({slug}).then(content => {

        if (!content) {
            return res.status(409).json({ summary: 'Empty', detail: 'Content is not available!' });
        }

        res.status(200).json(content);

    }).catch(err => {

        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
        
    });

}

// Add content

exports.addContent = (req, res, next) => {

    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const description = req.body.description;
    const image = req.body.image;
    const slug = req.body.slug;
    const contentTypeId = req.body.contentTypeId;

    const contentModel = new ContentModel({
        title: title,
        subTitle: subTitle,
        description: description,
        image: image,
        slug: slug,
        contentTypeId: contentTypeId
    });

    contentModel
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

// Edit content

exports.editContent = (req, res, next) => {

    const contentId = req.params.contentId;

    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const description = req.body.description;
    const image = req.body.image;
    const slug = req.body.slug;
    const contentTypeId = req.body.contentTypeId;
    
    ContentModel.findById(contentId).then(content => {
        
        if (!content) {
            return res.status(404).json({ summary: 'Not found!', detail: 'Could not find content!' });
        }

        content.title = title;
        content.subTitle = subTitle;
        content.description = description;
        content.image = image;
        content.slug = slug;
        content.contentTypeId = contentTypeId;

        return content.save();
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

// Delete content

exports.deleteContent = (req, res, next) => {

    const contentId = req.body.contentId;

    ContentModel.findByIdAndRemove(contentId).then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });

}