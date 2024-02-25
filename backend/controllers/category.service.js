const slugify = require("slugify");
const CategoryModel = require("../models/category.schema");
const asyncHandler = require("express-async-handler");

// Get all categories from the database and send them to the client side
exports.getAllCategory = asyncHandler(async (req, res) => {
    const allCategories = await CategoryModel.find();
    if (!allCategories || allCategories.length === 0) {
        return res.status(404).json({ message: "No category found" });
    } else {
        return res.status(200).json(allCategories);
    }
});

// Add a new category in the database
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    // Checking whether the field is empty or not
    if (!name) {
        return res.status(400).json({ message: "Name field cannot be empty!" });
    }
    let category = await CategoryModel.findOne({ name: name });
    // If there's already such a category then it will return an error otherwise it will add a new one
    if (category) {
        return res
            .status(409)
            .json({ message: "This category already exists." });
    } else {
        const newCategory = await CategoryModel.create({
            name,
            slug: slugify(name),
        });
        res.status(201).json({ data: newCategory });
    }
});

// Update an existing category
exports.updateCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, update, {
        new: true,
    });

    if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found." });
    } else {
        return res.json(updatedCategory);
    }
});

// Delete a category by its ID
exports.deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    return res
        .status(200)
        .json({ message: `${deletedCategory.name} Deleted Successfully!` });
});
