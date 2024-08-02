const express = require('express')
const router = express.Router();
const categoryController = require('../controller/category')

const {isAdmin} = require('../middleware/auth')


router.post('/', isAdmin, categoryController.createCategory)
router.get('/', isAdmin, categoryController.getAllCategory)
router.get('/:categoryId', isAdmin, categoryController.getCategoryById)
router.put('/:categoryId', isAdmin, categoryController.updateCategory)
router.delete('/:categoryId', isAdmin, categoryController.deleteCategory)

exports.router = router