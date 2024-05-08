import axios from "axios";

const BASE_URL = "http://localhost:3000/tickets";

export const createTicket = (ticketDto) => axios.post(BASE_URL, ticketDto);

export const getAllTickets = (queryParams) =>
  axios.get(BASE_URL, {
    params: { ...queryParams },
  });

export const getTicketById = (ticketId) => axios.get(BASE_URL + `/${ticketId}`);

export const updateTicket = (ticketId, ticketDto) => axios.patch(BASE_URL + `/${ticketId}`, ticketDto);