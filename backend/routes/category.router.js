const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const {
    createCategory,
    updateCategory,
    getAllCategory,
    deleteCategory,
    getOneCategory,
} = require("../controllers/category.service");

// Routes
router.route("/").get(getAllCategory).post(createCategory);
router
    .route("/:id")
    .get(validateObjectId, getOneCategory)
    .put(validateObjectId, updateCategory)
    .delete(validateObjectId, deleteCategory);

module.exports = router;
