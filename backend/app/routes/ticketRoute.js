const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/TicketController");

router.post("/create-ticket", ticketController.createTicket);
router.get("/get-ticket", ticketController.getAllTickets);
router.get("/get-ticket/:id", ticketController.getTicketsByEmployeeId);
router.put("/start/:id", ticketController.startTicket);
router.put("/stop/:id", ticketController.stopTicket);
router.delete("/delete/:id", ticketController.deleteTicket);

module.exports = router;
