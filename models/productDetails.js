const mongoose = require('mongoose')

const productDetailSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
    },
    productDescription: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: "Category",
        required: true
    }
})

module.exports = Product = mongoose.model('Product', productDetailSchema)