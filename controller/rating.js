const Rating = require("../models/productRatingDetails");
const User = require("../models/userDetail");
const Product = require("../models/productDetails");
const mongoose = require('mongoose')

exports.createRating = async (req, res) => {
  try {
    const { productId } = req.params
    const { rating, userId } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found hence can't create rating" })
    }

    const newRating = new Rating({
      product: productId,
      user: userId,
      rating,
    })
    const savedRating = await newRating.save()

    product.ratings.push(savedRating._id);
    await product.save();

    res.status(201).json({ message: "Rating created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}

exports.getRatingsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const ratings = await Rating.find({ product: productId })
    //   .populate("user", "rating")
    .populate({
        path: 'rating',
        select: 'user rating'
    })
      .sort({ createdAt: -1 });

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}

exports.getAverageRating = async (req, res) => {
  try {
    const productId = req.params.productId;
    const averageRating = await Rating.aggregate([
      {
        $match: { product: productId },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    res.json(averageRating[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
