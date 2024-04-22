const express = require("express");
const {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
} = require("../controllers/ProjectController");
const router = express.Router();

router.route("/").post(createProject).get(getAllProjects);

router.route("/:id").get(getProjectById).delete(deleteProject);

module.exports = router;
