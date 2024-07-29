const Category = require('../models/categoryDetails')

exports.createCategory = async(req, res) => {
    try{
        const {name} = req.body;
        const newCategory = new Category({name})
        const savedCategory = await newCategory.save()
        res.status(201).json(savedCategory)
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

exports.getAllCategory = async(req, res) => {
    try{
        const categories = await Category.find()
        res.json(categories)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getCategoryById = async(req, res) => {
    try{
        const category = await Category.findById(req.params.categoryId)
        if(category){
            res.json(category)
        }else{
            res.status(404).json({ message: 'Category not found' });
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.updateCategory = async(req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, req.body, {new: true})
        if(updatedCategory){
            res.json(updatedCategory)
        }else{
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.deleteCategory = async(req, res) => {
    try{
        const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId)
        if(deletedCategory){
            res.json({message: "Category deleted succesfully"})
        }else{
            res.status(404).json({message: "Category not found"})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
