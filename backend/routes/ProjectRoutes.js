const express = require("express");
const {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectMembers,
  updateProject,
  removeUserFromProject,
  getProjectsCount,
} = require("../controllers/ProjectController");
const { verifyAuth } = require("../middlewares/authorization");
const router = express.Router();

router
  .route("/")
  .post(verifyAuth, createProject)
  .get(verifyAuth, getAllProjects);

router.get("/count", verifyAuth, getProjectsCount);
router.get("/members/:id", verifyAuth, getProjectMembers);

router.patch("/:projectId/:userId", verifyAuth, removeUserFromProject);

router
  .route("/:id")
  .get(verifyAuth, getProjectById)
  .patch(verifyAuth, updateProject)
  .delete(verifyAuth, deleteProject);

module.exports = router;
