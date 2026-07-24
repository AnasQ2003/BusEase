const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { verifyToken } = require('../middleware/auth');

// In-memory ticket store
const tickets = [];

// POST /api/tickets — book a ticket (protected)
router.post('/', verifyToken, (req, res) => {
  try {
    const { bus_id, bus_name, from, to, departure, arrival, seats, passengers, total_price, payment_method } = req.body;

    if (!bus_id || !seats || !seats.length) {
      return res.status(400).json({ error: 'bus_id and seats are required.' });
    }

    const ticket = {
      id: uuidv4(),
      ticket_number: `BE${Date.now().toString().slice(-8)}`,
      user_id: req.user.id,
      bus_id,
      bus_name: bus_name || 'Unknown Bus',
      from: from || '',
      to: to || '',
      departure: departure || '',
      arrival: arrival || '',
      seats,
      passengers: passengers || [],
      total_price: total_price || 0,
      payment_method: payment_method || 'wallet',
      status: 'confirmed',
      booked_at: new Date().toISOString()
    };

    tickets.push(ticket);
    res.status(201).json({ message: 'Ticket booked successfully.', ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tickets — get all tickets for logged-in user (protected)
router.get('/', verifyToken, (req, res) => {
  const userTickets = tickets.filter(t => t.user_id === req.user.id);
  res.json({ count: userTickets.length, tickets: userTickets });
});

// GET /api/tickets/:id — get single ticket detail (protected)
router.get('/:id', verifyToken, (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id && t.user_id === req.user.id);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found.' });
  res.json({ ticket });
});

// DELETE /api/tickets/:id — cancel a ticket (protected)
router.delete('/:id', verifyToken, (req, res) => {
  const ticketIndex = tickets.findIndex(t => t.id === req.params.id && t.user_id === req.user.id);
  if (ticketIndex === -1) return res.status(404).json({ error: 'Ticket not found.' });

  if (tickets[ticketIndex].status === 'cancelled') {
    return res.status(400).json({ error: 'Ticket is already cancelled.' });
  }

  tickets[ticketIndex].status = 'cancelled';
  tickets[ticketIndex].cancelled_at = new Date().toISOString();
  res.json({ message: 'Ticket cancelled successfully.', ticket: tickets[ticketIndex] });
});

module.exports = router;
