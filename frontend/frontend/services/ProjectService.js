import axios from "axios";

const BASE_URL = "http://localhost:3000/projects";

export const createProject = (project) => axios.post(BASE_URL, project);
export const getAllProjects = () => axios.get(BASE_URL);
export const deleteProject = (projectId) =>
  axios.delete(BASE_URL + `/${projectId}`);
