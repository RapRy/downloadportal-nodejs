const express = require("express");
const Auth = require("../middleware/auth.js");
const {
  getFeatureds,
  getContentsByCat,
  getDetails,
  getContentViaReviewId,
  getContentViaCommentId,
  getContentsBySubcat,
} = require("../controllers/contentsController.js");

const router = express.Router();

router.get("/comment/:comId", Auth, getContentViaCommentId);
router.get("/review/:revId", Auth, getContentViaReviewId);
router.get("/details/:id", getDetails);
router.get("/:cat/:sub", getContentsBySubcat);
router.get("/featured", getFeatureds);
router.get("/:cat", getContentsByCat);

module.exports = router;
