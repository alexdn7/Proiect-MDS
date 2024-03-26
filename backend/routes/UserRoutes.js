const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/UserController");
const { verifyAuth, verifyAdmin } = require("../middlewares/authorization");
const router = express.Router();

router.get("/", getAllUsers);
router.delete("/delete/:id", verifyAuth, verifyAdmin, deleteUser);

module.exports = router;
