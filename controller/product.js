
const multer = require('multer')
const Product = require("../models/productDetails");
const upload = require("../middleware/multerConfig");
const path = require('path'); //
const PORT = process.env.PORT;
const cloudinary = require('../config/cloudinary') //

//CREATE PRODUCT
exports.createProduct = async (req, res) => {
    try {
      upload.single("productImage")(req, res, async (err) => {
        if (err) {
          if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
          } else {
            console.error("Error uploading file:", err);
            return res.status(500).json({ message: "File upload failed." });
          }
        }
        
        const { productName, productDescription, categoryId } = req.body;
        // const productImage = req.file ? req.file.path : "";
       
        const result = await cloudinary.uploader.upload(req.file.path)
        const productImage = result.secure_url

        const newProduct = new Product({
          productName,
          productImage, 
          productDescription,
          category: categoryId,
        })
  
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
      }); 
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
};

//LIST ALL PRODUCTS
exports.listAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 3
    const skip = (page - 1) * limit
    //for sort
    const sortOrder = parseInt(req.query.sort) || 1; //changed  

    const products = await Product.find().populate('category').skip(skip).limit(limit).sort({ productName: sortOrder })
    const totalProducts = await Product.countDocuments()

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId
    const product = await Product.findById(productId)
    if (!product) {
      res.status(404).json({ message: "product not found" });
    } else {
      res.status(201).json(product)
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};


// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  upload.single("productImage")(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else {
        console.error("Error uploading file:", err);
        return res.status(500).json({ message: "File upload failed." });
      }
    }

    try {
      const productId = req.params.productId;
      const { productName, productDescription, categoryId } = req.body;

      let updatedProductImage = req.body.productImage;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        updatedProductImage = result.secure_url;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          productName,
          productImage: updatedProductImage,
          productDescription,
          category: categoryId,
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  });
};

//DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};


// ? GET PRODUCTs BY CATEGORY ID
exports.getProductsByCategoryId = async(req, res) => {
  try {
    const categoryId = req.params.categoryId
    const products = await Product.find({category: categoryId})
    if (products.length === 0) {
      res.status(404).json({ message: 'No products found for this category' });
    }else{
      res.status(201).json(products)
    }   

  } catch (error) {
    res.status(500).json({message: error.message})
    console.log(error)
  }
}


//SEARCH API <---
exports.searchProduct = async (req, res) => {
  try {
    const { productName } = req.query; 
  
    if (!productName) {
      return res.status(400).json({ message: 'Product name query is required' });
    }
    const regex = new RegExp(productName, 'i'); 

    const products = await Product.find({
      productName: { $regex: regex }
    }).populate('category');

    
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error('Error searching for products:', error);
  }
};  
