const express = require("express");
const {
  createTicket,
  getAllTickets,
  updateTicket,
  getTicketById,
  deleteTicket,
  getTicketsCount,
} = require("../controllers/TicketController");
const { verifyAuth } = require("../middlewares/authorization");
const router = express.Router();

router.route("/").post(verifyAuth, createTicket).get(verifyAuth, getAllTickets);
router.get("/count", verifyAuth, getTicketsCount);
router
  .route("/:id")
  .get(verifyAuth, getTicketById)
  .patch(verifyAuth, updateTicket)
  .delete(verifyAuth, deleteTicket);

module.exports = router;
