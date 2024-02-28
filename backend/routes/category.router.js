const express = require("express");
const router = express.Router();
const {
    getCategoryValidator,
    postCategoriesValidator,
    putCategoryValidator,
    deleteCategoryValidator,
} = require("../utils/validator/categoryValidator");
const validateObjectId = require("../middleware/validateObjectId");
const {
    createCategory,
    updateCategory,
    getAllCategory,
    deleteCategory,
    getOneCategory,
} = require("../controllers/category.service");

// Routes
router
    .route("/")
    .get(getAllCategory)
    .post(postCategoriesValidator, createCategory);
router
    .route("/:id")
    .get([getCategoryValidator, validateObjectId], getOneCategory)
    .put([putCategoryValidator, validateObjectId], updateCategory)
    .delete([deleteCategoryValidator, validateObjectId], deleteCategory);

module.exports = router;
