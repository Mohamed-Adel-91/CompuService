const express = require("express");
const router = express.Router();
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
    .get(getOneCategory)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;
