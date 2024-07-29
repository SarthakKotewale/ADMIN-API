const mongoose = require('mongoose')

const categoryDetailSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const Category = mongoose.model('Category', categoryDetailSchema)
module.exports = Category