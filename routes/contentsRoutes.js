const express = require("express");
const Auth = require("../middleware/auth.js");
const {
  getFeatureds,
  getContentsBySub,
} = require("../controllers/contentsController.js");

const router = express.Router();

router.get("/featured", getFeatureds);
router.get("/:cat/:sub", Auth, getContentsBySub);

module.exports = router;
