import axios from "axios";

const BASE_URL = "http://localhost:3000/projects";

export const createProject = (project) => axios.post(BASE_URL, project);

export const getAllProjects = () => axios.get(BASE_URL);

export const getProjectById = (projectId) =>
  axios.get(BASE_URL + `/${projectId}`);

export const getProjectMembers = (projectId) =>
  axios.get(BASE_URL + `/members/${projectId}`);
  
export const deleteProject = (projectId) =>
  axios.delete(BASE_URL + `/${projectId}`);
