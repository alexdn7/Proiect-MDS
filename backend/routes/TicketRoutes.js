const express = require("express");
const { createTicket, getAllTickets, updateTicket, getTicketById, deleteTicket } = require("../controllers/TicketController");
const router = express.Router();

router.route("/")
    .post(createTicket)
    .get(getAllTickets);

router.route("/:id")
    .get(getTicketById)
    .patch(updateTicket)
    .delete(deleteTicket);

module.exports = router;