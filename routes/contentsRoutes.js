const express = require("express");
const Auth = require("../middleware/auth.js");
const {
  getFeatureds,
  getContentsByCat,
} = require("../controllers/contentsController.js");

const router = express.Router();

router.get("/featured", getFeatureds);
router.get("/:cat", Auth, getContentsByCat);

module.exports = router;
