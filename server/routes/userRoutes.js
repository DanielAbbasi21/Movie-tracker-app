const express = require("express");
const { createUser, getUsers, getUserById, updateUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

module.exports = router;