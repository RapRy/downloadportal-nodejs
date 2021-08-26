const express = require("express");
const {
  getSubcategoriesByCat,
  getSubcategories,
} = require("../controllers/subcategoriesController.js");

const router = express.Router();

router.get("/", getSubcategories);
router.get("/:cat", getSubcategoriesByCat);

module.exports = router;
