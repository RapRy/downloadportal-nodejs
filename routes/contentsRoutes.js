const express = require("express");
const Auth = require("../middleware/auth.js");
const {
  getFeatureds,
  getContentsByCat,
  getDetails,
} = require("../controllers/contentsController.js");

const router = express.Router();

router.get("/details/:id", Auth, getDetails);
router.get("/featured", getFeatureds);
router.get("/:cat", Auth, getContentsByCat);

module.exports = router;
