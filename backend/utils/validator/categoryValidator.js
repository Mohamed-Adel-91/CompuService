const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.getCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware,
];

exports.postCategoriesValidator = [
    check("name")
        .notEmpty()
        .withMessage("Name is required")
        .bail() // Stop validation if the name fails
        .isLength({ min: 3 })
        .withMessage("Too short Name must be at least 3 characters long")
        .isLength({ max: 32 })
        .withMessage("Too long Name must be maximum 32 characters long"),
    validatorMiddleware,
];

exports.putCategoryValidator = [
    ...this.getCategoryValidator,
    ...this.postCategoriesValidator,
];

exports.deleteCategoryValidator = [...this.getCategoryValidator];
