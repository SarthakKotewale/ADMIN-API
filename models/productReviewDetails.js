const mongoose = require('mongoose')

const productReviewSchema = new mongoose.Schema({
  productId:{
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref:'Product',
    // required: true
  },
  userId: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId, 
    ref:'UserInfo',
    required: true
  },
  reviewText: {
    type: String,
  }
},{
  timestamps:true
})

const Review = mongoose.model('Review', productReviewSchema)
module.exports = Review