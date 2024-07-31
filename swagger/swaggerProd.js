const express = require('express')
const router = express.Router()
const productController = require('../controller/product')

const upload = require('../middleware/multerConfig'); //

//isAdmin auth middleware
const {isAdmin} = require('../middleware/auth')

//SWAGGER

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: Microwave
 *               productImage:
 *                 type: string
 *                 example:  http://localhost:3400/uploads/image.jpg
 *               productDescription:
 *                 type: string
 *                 example: a microwave
 *               categoryId:
 *                 type: string
 *                 example: 66a3705bda801e63666954b4
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error          
 */
router.post('/products', isAdmin, productController.createProduct)


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get('/products', isAdmin, productController.listAllProducts)


/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/product/:productId', isAdmin, productController.getProductById)



/**
 * @swagger
 * /updateProduct/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: Microwave
 *               productImage:
 *                 type: string
 *                 example: http://localhost:3400/uploads/image.jpg
 *               productDescription:
 *                 type: string
 *                 example: A high-quality microwave
 *               categoryId:
 *                 type: string
 *                 example: 605c72ef8b08a03f84c8b9b9
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put('/updateProduct/:productId', isAdmin, productController.updateProduct)
//----------------------------------------



//----------------------------------------
/**
 * @swagger
 * /deleteProduct/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteProduct/:productId', isAdmin, productController.deleteProduct)
//----------------------------------------



//----------------------------------------
/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by name
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: productName
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get('/products/search', isAdmin, productController.searchProduct)
//----------------------------------------



//----------------------------------------
/**
 * @swagger
 * /products/{categoryId}:
 *   get:
 *     summary: Retrieve products by category ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found for this category
 *       500:
 *         description: Server error
 */
router.get('/products/:categoryId', isAdmin, productController.getProductsByCategoryId)
//------------------------------

exports.router = router