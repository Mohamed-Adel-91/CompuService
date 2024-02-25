const slugify = require("slugify");
const CategoryModel = require("../models/category.schema");

// Get all categories from the database and send them to the client side
exports.getAllCategory = async (req, res) => {
    try {
        const allCategories = await CategoryModel.find();
        if (!allCategories || allCategories.length === 0) {
            return res.status(404).json({ message: "No category found" });
        } else {
            return res.status(200).json(allCategories);
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// Add a new category in the database
exports.createCategory = async (req, res) => {
    try {
        const name = req.body.name;
        const newCategory = await CategoryModel.create({
            name,
            slug: slugify(name),
        });
        res.status(201).json({ data: newCategory });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;

        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found." });
        } else {
            return res.json(updatedCategory);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
};

// Delete a category by its ID
exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        return res
            .status(200)
            .json({ message: `${deletedCategory.name} Deleted Successfully!` });
    } catch (err) {
        return res.status(500).json(err);
    }
};