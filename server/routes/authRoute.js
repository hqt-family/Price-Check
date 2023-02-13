const express = require("express");
const { getUsers, registerUser, loginUser, updateUser } = require("../controllers/authController");
const router = express.Router();

router.get("/all", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/user:id", updateUser);

module.exports = router;
