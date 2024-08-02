const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
const reviewController = require('../controller/review')

const ratingController = require('../controller/rating')

const upload = require('../middleware/multerConfig'); //

//isAdmin auth middleware
const {isAdmin} = require('../middleware/auth')
const {isUser} = require('../middleware/auth')

router.post('/products', isAdmin, productController.createProduct)
router.get('/products', isAdmin, productController.listAllProducts)
router.get('/product/:productId', isAdmin, productController.getProductById)
// 
router.put('/updateProduct/:productId', isAdmin, productController.updateProduct)
router.delete('/deleteProduct/:productId', isAdmin, productController.deleteProduct)
router.get('/products/search', isAdmin, productController.searchProduct)
router.get('/products/:categoryId', isAdmin, productController.getProductsByCategoryId)

//reviews routes    
router.post('/createReview/:productId', reviewController.createReview) //added isUser auth
// router.get('/getReview/:reviewId', reviewController.getReview)
router.get('/getReview/:productId', reviewController.getReview)
router.delete('/deleteReview/:reviewId', reviewController.deleteReview)


//rating routes
// router.post('/createRating/:productId', ratingController.createRating)
router.post('/products/:productId/ratings', ratingController.createRating)
router.get('/products/:productId/ratings', ratingController.getRatingsByProductId) //todo -test
router.get('/products/:productId/rating', ratingController.getAverageRating) //todo - test

exports.router = router