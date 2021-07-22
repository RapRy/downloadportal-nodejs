const express = require("express");
const {
  signUp,
  register,
  signIn,
} = require("../controllers/usersController.js");

const router = express.Router();

router.post("/signin", signIn);
router.post("/register", register);
router.post("/signup", signUp);

module.exports = router;
