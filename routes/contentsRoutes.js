const express = require("express");
const { getFeatureds } = require("../controllers/contentsController.js");

const router = express.Router();

router.get("/featured", getFeatureds);

module.exports = router;
