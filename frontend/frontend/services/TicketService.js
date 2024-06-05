import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3000/tickets";
const token = Cookies.get("token");
const TOKEN_HEADER = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const createTicket = (ticketDto) => axios.post(BASE_URL, ticketDto, TOKEN_HEADER);

export const getAllTickets = (queryParams) =>
  axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { ...queryParams },
  });

export const getTicketsCount = () =>
  axios.get(BASE_URL + "/count", TOKEN_HEADER);

export const getTicketById = (ticketId) =>
  axios.get(BASE_URL + `/${ticketId}`, TOKEN_HEADER);

export const updateTicket = (ticketId, ticketDto) =>
  axios.patch(BASE_URL + `/${ticketId}`, ticketDto, TOKEN_HEADER);

export const deleteTicket = (ticketId) =>
  axios.delete(BASE_URL + `/${ticketId}`, TOKEN_HEADER);
