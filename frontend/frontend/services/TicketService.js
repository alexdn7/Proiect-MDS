import axios from 'axios';

const BASE_URL = "http://localhost:3000/tickets";

export const createTicket = (ticket) => axios.post(BASE_URL, ticket);