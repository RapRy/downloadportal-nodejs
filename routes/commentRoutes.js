const express = require("express");
const Auth = require("../middleware/auth.js");
const { postComment } = require("../controllers/commentsController.js");

const router = express.Router();

router.post("/createcomment", Auth, postComment);

module.exports = router;
