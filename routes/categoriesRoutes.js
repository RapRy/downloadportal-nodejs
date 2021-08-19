const express = require("express");
const {
  getCategories,
  getCategory,
} = require("../controllers/categoriesController.js");

const router = express.Router();

router.get("/", getCategories);
router.get("/:cat", getCategory);

module.exports = router;
