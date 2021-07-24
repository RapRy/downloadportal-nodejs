const express = require("express");
const { getCategories } = require("../controllers/categoriesController.js");

const router = express.Router();

router.get("/", getCategories);

module.exports = router;
