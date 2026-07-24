const express = require('express');
const router = express.Router();

// Seeded mock bus data
const buses = [
  {
    id: 'bus-001',
    name: 'City Express',
    operator: 'Daewoo Express',
    from: 'Lahore',
    to: 'Islamabad',
    departure: '07:00',
    arrival: '12:00',
    duration: '5h 00m',
    price: 1200,
    seats_total: 44,
    seats_available: 18,
    amenities: ['AC', 'WiFi', 'USB Charging', 'Reclining Seats'],
    type: 'Business',
    rating: 4.5
  },
  {
    id: 'bus-002',
    name: 'Road Runner',
    operator: 'Faisal Movers',
    from: 'Lahore',
    to: 'Islamabad',
    departure: '09:30',
    arrival: '15:00',
    duration: '5h 30m',
    price: 900,
    seats_total: 44,
    seats_available: 30,
    amenities: ['AC', 'USB Charging'],
    type: 'Economy',
    rating: 4.0
  },
  {
    id: 'bus-003',
    name: 'Luxury Liner',
    operator: 'Skyways',
    from: 'Karachi',
    to: 'Lahore',
    departure: '20:00',
    arrival: '08:00',
    duration: '12h 00m',
    price: 3500,
    seats_total: 36,
    seats_available: 10,
    amenities: ['AC', 'WiFi', 'Sleeper Seats', 'Blanket', 'Meal'],
    type: 'Sleeper',
    rating: 4.8
  },
  {
    id: 'bus-004',
    name: 'Swat Shuttle',
    operator: 'Northern Express',
    from: 'Islamabad',
    to: 'Swat',
    departure: '06:00',
    arrival: '12:30',
    duration: '6h 30m',
    price: 1500,
    seats_total: 40,
    seats_available: 22,
    amenities: ['AC', 'WiFi'],
    type: 'Business',
    rating: 4.3
  }
];

// GET /api/buses — search buses (query: from, to, date)
router.get('/', (req, res) => {
  const { from, to } = req.query;
  let results = [...buses];

  if (from) results = results.filter(b => b.from.toLowerCase().includes(from.toLowerCase()));
  if (to)   results = results.filter(b => b.to.toLowerCase().includes(to.toLowerCase()));

  res.json({ count: results.length, buses: results });
});

// GET /api/buses/:id — get single bus details
router.get('/:id', (req, res) => {
  const bus = buses.find(b => b.id === req.params.id);
  if (!bus) return res.status(404).json({ error: 'Bus not found.' });
  res.json({ bus });
});

// GET /api/buses/:id/seats — get seat layout for a bus
router.get('/:id/seats', (req, res) => {
  const bus = buses.find(b => b.id === req.params.id);
  if (!bus) return res.status(404).json({ error: 'Bus not found.' });

  // Generate seat layout: A = window left, B = aisle left, C = aisle right, D = window right
  const rows = Math.ceil(bus.seats_total / 4);
  const seats = [];
  const bookedCount = bus.seats_total - bus.seats_available;
  const bookedSeats = new Set();

  // Randomly mark some seats as booked
  while (bookedSeats.size < bookedCount) {
    bookedSeats.add(Math.floor(Math.random() * bus.seats_total));
  }

  let seatIndex = 0;
  for (let r = 1; r <= rows; r++) {
    for (const col of ['A', 'B', 'C', 'D']) {
      if (seatIndex < bus.seats_total) {
        seats.push({
          id: `${r}${col}`,
          row: r,
          col,
          status: bookedSeats.has(seatIndex) ? 'booked' : 'available'
        });
        seatIndex++;
      }
    }
  }

  res.json({ bus_id: bus.id, seats });
});

module.exports = router;
