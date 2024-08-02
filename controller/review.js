const Review = require('../models/productReviewDetails')
const User = require('../models/userDetail')
const Product = require('../models/productDetails')


exports.createReview = async (req, res) => {
  try {
    const {productId} = req.params
    const { rating, reviewText, userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newReview = new Review({
      productId,
      userId,
      rating,
      reviewText,
    });

    const savedReview = await newReview.save();

    product.reviews.push(savedReview._id); 
    await product.save(); 

    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};


exports.getReview = async(req, res) => {
  const {productId} = req.params
  try{
    const review = await Review.find({productId: productId})
    if(!review){
      res.status(500).json({message: 'Review not found'})
    }else{
      res.status(200).json(review)
    }
  }catch(error){
    res.status(500).json({message: error.message})
  }
}

exports.deleteReview = async(req, res) => {
  try{
    const {reviewId} = req.params
    const reviewDelete = await Review.findByIdAndDelete(reviewId)
    res.status(200).json(reviewDelete)
    console.log("Review deleted")
  }catch(error){
    res.status(500).json({message: error.message})
  }
}