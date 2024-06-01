const express = require("express");
const {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectMembers,
  updateProject,
  removeUserFromProject,
} = require("../controllers/ProjectController");
const router = express.Router();

router.route("/").post(createProject).get(getAllProjects);
router.get("/members/:id", getProjectMembers);
router.patch("/:projectId/:userId", removeUserFromProject);

router.route("/:id").get(getProjectById).patch(updateProject).delete(deleteProject);

module.exports = router;
