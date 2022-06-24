const CategoryModel = require('../../models/category-model');
const slugify = require("slugify");
const { treeView } = require("../../util/logic");

// All category

exports.getCategories = (req, res, next) => {

    CategoryModel.find()
        .then(categories => {
            if (categories) {
                const categoryTree = treeView(categories);
                res.status(200).json({
                    tree: categoryTree,
                    list: categories
                });
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
    const slug = `_${slugify(req.body.name, {replacement: '_', strict: true, lower: true})}_${Math.floor(Math.random() * 100)}`;
    const image = req.body.image;
    const parentId = req.body.parentId;

    const categoryModel = new CategoryModel({
        name: name,
        slug: slug,
        image: image,
        parentId: parentId
    });

    categoryModel
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
    const image = req.body.image;
    const parentId = req.body.parentId;

    CategoryModel.findById(categoryId)
        .then(category => {

            if (!category) {
                return res.status(404).json({ summary: 'Not found!', detail: 'Could not find category!' });
            }

            category.name = name;
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