const slugify = require("slugify");
const CategoryModel = require("../models/category.schema");
const asyncHandler = require("express-async-handler");

// Regular expression to check for symbols, or numbers
const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;

//@desc Get all categories from the database and send them to the client side
//@route GET /api/v1/categories
//@access Public

exports.getAllCategory = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const allCategories = await CategoryModel.find({}).skip(skip).limit(limit);
    if (!allCategories || allCategories.length === 0) {
        return res.status(404).json({ message: "No category found" });
    } else {
        return res
            .status(200)
            .json({ results: allCategories.length, page, data: allCategories });
    }
});

//@desc Get one categories from the database and send them to the client side
//@route GET /api/v1/categories/:id
//@access Public

exports.getOneCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const oneCat = await CategoryModel.findById(id);
    if (!oneCat) {
        return res
            .status(404)
            .json({ message: `Category with id ${id} not found` });
    } else {
        res.status(200).json({ data: oneCat });
    }
});

//@desc Add a new category in the database
//@route POST /api/v1/categories
//@access Private

exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;

    // Checking whether the field is empty or not
    if (!name) {
        return res.status(400).json({ message: "Name field cannot be empty!" });
    }

    if (
        regex.test(name) ||
        name.startsWith(" ") ||
        name.startsWith("\n") ||
        name.endsWith(" ") ||
        name.endsWith("\n") ||
        name.length < 3
    ) {
        return res.status(400).json({
            message:
                "Please enter valid input without any special characters or spaces or numbers or less then three letters.",
        });
    } else {
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
    }
});

//@desc Update an existing category
//@route PUT /api/v1/categories/:id
//@access Private

exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    // Checking whether the field is empty or not
    if (!name) {
        return res.status(400).json({ message: "Name field cannot be empty!" });
    }

    if (
        regex.test(name) ||
        name.startsWith(" ") ||
        name.startsWith("\n") ||
        name.endsWith(" ") ||
        name.endsWith("\n") ||
        name.length < 3
    ) {
        return res.status(400).json({
            message:
                "Please enter valid input without any special characters or spaces or numbers or less then three letters.",
        });
    } else {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            { _id: id },
            { name, slug: slugify(name) },
            {
                new: true,
            }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found." });
        } else {
            return res.status(200).json(updatedCategory);
        }
    }
});

//@desc Delete a category by its ID
//@route DELETE /api/v1/categories/:id
//@access Private

exports.deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found." });
    }
    return res
        .status(200)
        .json({ message: `${deletedCategory.name} Deleted Successfully!` });
});
