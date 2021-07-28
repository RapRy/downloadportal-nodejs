const express = require("express");
const {
  signUp,
  register,
  signIn,
  updateProfile,
  changePassword,
  updateSettings,
  deactivateAccount,
} = require("../controllers/usersController.js");
const Auth = require("../middleware/auth.js");

const router = express.Router();

router.put("/update/profile", Auth, updateProfile);
router.put("/update/security", Auth, changePassword);
router.put("/update/settings", Auth, updateSettings);

router.put("/deactivate/:id", deactivateAccount);

router.post("/signin", signIn);
router.post("/register", register);
router.post("/signup", signUp);

module.exports = router;
