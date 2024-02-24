const express = require("express");
const router = express.Router();
const { createCategory } = require("../controllers/category.service");

// Routes
router.post("/", createCategory);

module.exports = router;
