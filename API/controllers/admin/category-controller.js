const CategoryModel = require('../../models/category-model');
const slugify = require("slugify");

function treeView(categories, parentId = null) {

    const categoryList = [];
    let cates;

    if (parentId == null) {
        cates = categories.filter((cat) => cat.parentId == undefined);
    } else {
        cates = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of cates) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: treeView(categories, cate._id),
        });
    }

    return categoryList;

}

// All category

exports.getCategories = (req, res, next) => {

    CategoryModel.find()
        .then(categories => {
            if (categories) {
                const categoryList = treeView(categories);
                res.status(200).json(categoryList);
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

// Single category

exports.getCategory = (req, res, next) => {

    const categoryId = req.params.categoryId;

    CategoryModel.findById(categoryId)
        .then(category => {

            if (!category) {
                return res.status(404).json({ summary: 'Not found!', detail: 'Could not find category!' });
            }

            res.status(200).json(category);

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

// Add category

exports.addCategory = (req, res, next) => {

    const name = req.body.name;
    const slug = slugify(req.body.name, '_');
    const image = req.body.image;
    const parentId = req.body.parentId;

    const CategoryModel = new CategoryModel({
        name: name,
        slug: slug,
        image: image,
        parentId: parentId
    });

    CategoryModel
        .save()
        .then(category => {
            res.status(201).json(category);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

// Edit category

exports.editCategory = (req, res, next) => {

    const categoryId = req.params.categoryId;

    const name = req.body.name;
    const slug = slugify(req.body.name, '_');
    const image = req.body.image;
    const parentId = req.body.parentId;

    CategoryModel.findById(categoryId)
        .then(category => {

            if (!category) {
                return res.status(404).json({ summary: 'Not found!', detail: 'Could not find category!' });
            }

            category.name = name;
            category.slug = slug;
            category.image = image;
            category.parentId = parentId;

            return category.save();

        }).then(result => {

            res.status(201).json(result);

        }).catch(err => {

            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            
        });

}

// Delete category

exports.deleteCategory = (req, res, next) => {

    const categoryId = req.body.categoryId;

    CategoryModel.findByIdAndRemove(categoryId)
        .then(result => {
            res.status(201).json({
                message: "category deleted..",
                data: result
            })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}