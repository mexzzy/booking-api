const express = require("express");
const login = require("../controllers/auth/login");
const signup = require("../controllers/auth/signup");
const updateUsername = require("../controllers/auth/updateUsername");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/update-username/:userId", updateUsername);

module.exports = router;
