const slugify = require("slugify");
const CategoryModel = require("../models/category.schema");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const { isValidName } = require("../utils/regex");

//@desc Get all categories from the database and send them to the client side
//@route GET /api/v1/categories
//@access Public

exports.getAllCategory = asyncHandler(async (req, res, next) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const allCategories = await CategoryModel.find({}).skip(skip).limit(limit);
    if (!allCategories || allCategories.length === 0) {
        next(new ApiError("No category found", 404));
        return;
    }

    return res
        .status(200)
        .json({ results: allCategories.length, page, data: allCategories });
});

//@desc Get one categories from the database and send them to the client side
//@route GET /api/v1/categories/:id
//@access Public

exports.getOneCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const oneCat = await CategoryModel.findById(id);
    if (!oneCat) {
        next(new ApiError(`Category with id ${id} not found`, 404));
        return;
    }
    res.status(200).json({ data: oneCat });
});

//@desc Add a new category in the database
//@route POST /api/v1/categories
//@access Private

exports.createCategory = asyncHandler(async (req, res, next) => {
    const name = req.body.name;

    // Checking whether the field is empty or not
    if (!name) {
        next(new ApiError("Name field cannot be empty!", 400));
        return;
    }

    if (!isValidName(name)) {
        next(
            new ApiError(
                "Please enter valid input without any special characters or spaces or numbers or not less then three letters.",
                400
            )
        );
        return;
    }
    let category = await CategoryModel.findOne({ name: name });
    // If there's already such a category then it will return an error otherwise it will add a new one
    if (category) {
        next(new ApiError("This category already exists.", 409));
        return;
    }
    const newCategory = await CategoryModel.create({
        name,
        slug: slugify(name),
    });
    res.status(201).json({ data: newCategory });
});

//@desc Update an existing category
//@route PUT /api/v1/categories/:id
//@access Private

exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    // Checking whether the field is empty or not
    if (!name) {
        next(new ApiError("Name field cannot be empty!", 400));
        return;
    }

    if (!isValidName(name)) {
        next(
            new ApiError(
                "Please enter valid input without any special characters or spaces or numbers or not less then three letters.",
                400
            )
        );
        return;
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        {
            new: true,
        }
    );

    if (!updatedCategory) {
        next(new ApiError("Category not found.", 404));
        return;
    }
    return res.status(200).json(updatedCategory);
});

//@desc Delete a category by its ID
//@route DELETE /api/v1/categories/:id
//@access Private

exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
        next(new ApiError("Category not found.", 404));
        return;
    }
    return res
        .status(204)
        .json({ message: `${deletedCategory.name} Deleted Successfully!` });
});
