import axios from "axios";

const BASE_URL = "http://localhost:3000/auth";

export const loginUser = (credentials) =>
  axios.post(BASE_URL + "/login", credentials);

export const register = (userDetails) =>
  axios.post(BASE_URL + "/register", userDetails);
