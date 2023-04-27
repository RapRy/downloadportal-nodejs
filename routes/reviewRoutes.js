const express = require("express");
const Auth = require("../middleware/auth.js");
const {
  postReview,
  // postComment,
} = require("../controllers/reviewsController.js");

const router = express.Router();

// router.post("/createcomment", Auth, postComment);
router.post("/createreview", Auth, postReview);

module.exports = router;
