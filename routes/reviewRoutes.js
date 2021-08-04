const express = require("express");
const Auth = require("../middleware/auth.js");
const { postReview } = require("../controllers/reviewsController.js");

const router = express.Router();

router.post("/createreview", Auth, postReview);

module.exports = router;
