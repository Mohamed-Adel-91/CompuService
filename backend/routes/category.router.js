const express = require("express");
const router = express.Router();
const {
    createCategory,
    updateCategory,
    getAllCategory,
    deleteCategory,
} = require("../controllers/category.service");

// Routes
router.route("/").get(getAllCategory).post(createCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

module.exports = router;
