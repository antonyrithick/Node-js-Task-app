const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const { employeeId, taskName, description, status } = req.body;
    const newTicket = await Ticket.create({
      employeeId,
      taskName,
      description,
      status,
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating ticket", details: error.message });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching tickets", details: error.message });
  }
};

exports.getTicketsByEmployeeId = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { employeeId: req.params.id },
    });

    if (tickets.length === 0) {
      return res
        .status(200)
        .json({ error: "No tickets found for this employee" });
    }

    res.status(200).json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching tickets", details: error.message });
  }
};

exports.startTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    await ticket.update({ startTime: new Date(), status: "In Progress" });
    res.status(200).json({ message: "Timer started", ticket });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error starting timer", details: error.message });
  }
};

exports.stopTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    await ticket.update({ endTime: new Date(), status: "Completed" });
    res.status(200).json({ message: "Timer stopped", ticket });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error stopping timer", details: error.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    await ticket.destroy();
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting ticket", details: error.message });
  }
};
