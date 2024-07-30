const express = require('express')
const router = express.Router()
const productController = require('../controller/product')

const upload = require('../middleware/multerConfig'); //

//isAdmin auth middleware
const {isAdmin} = require('../middleware/auth')

router.post('/products', isAdmin, productController.createProduct)
router.get('/products', isAdmin, productController.listAllProducts)
router.get('/product/:productId', isAdmin, productController.getProductById)
// 
router.put('/updateProduct/:productId', isAdmin, productController.updateProduct)
router.delete('/deleteProduct/:productId', isAdmin, productController.deleteProduct)
router.get('/products/search', isAdmin, productController.searchProduct)
router.get('/products/:categoryId', isAdmin, productController.getProductsByCategoryId)

exports.router = router