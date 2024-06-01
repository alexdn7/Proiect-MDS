import axios from "axios";

const BASE_URL = "http://localhost:3000/projects";

export const createProject = (project) => axios.post(BASE_URL, project);

export const getAllProjects = () => axios.get(BASE_URL);

export const getProjectById = (projectId) =>
  axios.get(BASE_URL + `/${projectId}`);

export const getProjectMembers = (projectId) =>
  axios.get(BASE_URL + `/members/${projectId}`);

export const updateProject = (projectId, projectDto) =>
  axios.patch(BASE_URL + `/${projectId}`, projectDto);

export const removeUserFromProject = (projectId, userId) =>
  axios.patch(BASE_URL + `/${projectId}/${userId}`);

export const deleteProject = (projectId) =>
  axios.delete(BASE_URL + `/${projectId}`);
