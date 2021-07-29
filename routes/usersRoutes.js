const express = require("express");
const {
  signUp,
  register,
  signIn,
  updateProfile,
  changePassword,
  updateSettings,
  deactivateAccount,
  getActivities,
} = require("../controllers/usersController.js");
const Auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/activities/:id", Auth, getActivities);

router.put("/update/profile", Auth, updateProfile);
router.put("/update/security", Auth, changePassword);
router.put("/update/settings", Auth, updateSettings);

router.put("/deactivate/:id", Auth, deactivateAccount);

router.post("/signin", signIn);
router.post("/register", register);
router.post("/signup", signUp);

module.exports = router;
