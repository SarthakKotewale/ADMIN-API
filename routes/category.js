const express = require('express')
const router = express.Router();
const categoryController = require('../controller/category')

const {isAdmin} = require('../middleware/auth')

router
    .post('/', isAdmin, categoryController.createCategory)
    .get('/', isAdmin, categoryController.getAllCategory)
    .get('/:categoryId', isAdmin, categoryController.getCategoryById)
    .put('/:categoryId', isAdmin, categoryController.updateCategory)
    .delete('/:categoryId', isAdmin, categoryController.deleteCategory)

exports.router = router