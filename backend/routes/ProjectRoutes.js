const express = require("express");
const {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectMembers,
  updateProject,
} = require("../controllers/ProjectController");
const router = express.Router();

router.route("/").post(createProject).get(getAllProjects);
router.get("/members/:id", getProjectMembers);

router.route("/:id").get(getProjectById).patch(updateProject).delete(deleteProject);

module.exports = router;
