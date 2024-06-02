import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3000/users";

const token = Cookies.get("token");
const TOKEN_HEADER = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getAllUsers = () => axios.get(BASE_URL + "/", TOKEN_HEADER);

export const getUserById = (userId) =>
  axios.get(BASE_URL + `/${userId}`, TOKEN_HEADER);

export const deleteUser = (id) =>
  axios.delete(BASE_URL + `/delete/${id}`, TOKEN_HEADER);
