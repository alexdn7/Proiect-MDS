const express = require("express");
const {
  getAllUsers,
  deleteUser,
  getUserById,
} = require("../controllers/UserController");
const { verifyAuth, verifyAdmin } = require("../middlewares/authorization");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", verifyAuth, getUserById);
router.delete("/delete/:id", verifyAuth, verifyAdmin, deleteUser);

module.exports = router;
