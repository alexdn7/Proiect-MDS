const express = require("express");
const {
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUsersCount,
} = require("../controllers/UserController");
const { verifyAuth } = require("../middlewares/authorization");
const router = express.Router();

router.get("/", verifyAuth, getAllUsers);
router.get("/count", verifyAuth, getUsersCount);
router
  .route("/:id")
  .get(verifyAuth, getUserById)
  .put(verifyAuth, updateUser)
  .delete(verifyAuth, deleteUser);

module.exports = router;
