const express = require("express");
const {
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/UserController");
const { verifyAuth } = require("../middlewares/authorization");
const router = express.Router();

router.get("/", getAllUsers);
router
  .route("/:id")
  .get(verifyAuth, getUserById)
  .put(verifyAuth, updateUser)
  .delete(verifyAuth, deleteUser);

module.exports = router;
