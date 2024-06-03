import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3000/projects";
const token = Cookies.get("token");
const TOKEN_HEADER = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const createProject = (project) =>
  axios.post(BASE_URL, project, TOKEN_HEADER);

export const getAllProjects = () => axios.get(BASE_URL, TOKEN_HEADER);

export const getProjectById = (projectId) =>
  axios.get(BASE_URL + `/${projectId}`, TOKEN_HEADER);

export const getProjectsCount = () => axios.get(BASE_URL + "/count", TOKEN_HEADER);

export const getProjectMembers = (projectId) =>
  axios.get(BASE_URL + `/members/${projectId}`, TOKEN_HEADER);

export const updateProject = (projectId, projectDto) =>
  axios.patch(BASE_URL + `/${projectId}`, projectDto, TOKEN_HEADER);

export const removeUserFromProject = (projectId, userId) =>
  axios.patch(BASE_URL + `/${projectId}/${userId}`, {}, TOKEN_HEADER);

export const deleteProject = (projectId) =>
  axios.delete(BASE_URL + `/${projectId}`, TOKEN_HEADER);
