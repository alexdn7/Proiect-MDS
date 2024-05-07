const express = require("express");
const { createTicket, getAllTickets, updateTicket, getTicketById } = require("../controllers/TicketController");
const router = express.Router();

router.route("/")
    .post(createTicket)
    .get(getAllTickets);

router.route("/:id")
    .get(getTicketById)
    .patch(updateTicket)

module.exports = router;