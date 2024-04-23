const express = require("express");
const { createTicket, getAllTickets } = require("../controllers/TicketController");
const router = express.Router();

router.route("/")
    .post(createTicket)
    .get(getAllTickets);

module.exports = router;