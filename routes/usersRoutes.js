const express = require("express");
const {
  signUp,
  register,
  signIn,
  updateProfile,
} = require("../controllers/usersController.js");
const Auth = require("../middleware/auth.js");

const router = express.Router();

router.put("/update/profile", Auth, updateProfile);

router.post("/signin", signIn);
router.post("/register", register);
router.post("/signup", signUp);

module.exports = router;
