const express = require("express");
const {
  createProject,
  deleteProject,
} = require("../controllers/ProjectController");
const router = express.Router();

router.route("/").post(createProject);

router.route("/:id").delete(deleteProject);

module.exports = router;
