const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Mock live tracking data per bus
const trackingData = {
  'bus-001': {
    bus_id: 'bus-001',
    bus_name: 'City Express',
    from: 'Lahore',
    to: 'Islamabad',
    current_location: { lat: 31.5204, lng: 74.3587, label: 'Lahore Ring Road' },
    stops_completed: ['Lahore Bus Terminal'],
    next_stop: 'Gujranwala',
    estimated_arrival: '12:00',
    delay_minutes: 0,
    speed_kmh: 85,
    progress_percent: 15
  },
  'bus-002': {
    bus_id: 'bus-002',
    bus_name: 'Road Runner',
    from: 'Lahore',
    to: 'Islamabad',
    current_location: { lat: 32.1617, lng: 74.1883, label: 'Gujranwala Bypass' },
    stops_completed: ['Lahore Bus Terminal', 'Gujranwala'],
    next_stop: 'Gujrat',
    estimated_arrival: '15:00',
    delay_minutes: 10,
    speed_kmh: 90,
    progress_percent: 35
  },
  'bus-003': {
    bus_id: 'bus-003',
    bus_name: 'Luxury Liner',
    from: 'Karachi',
    to: 'Lahore',
    current_location: { lat: 28.3949, lng: 69.2966, label: 'Rahim Yar Khan' },
    stops_completed: ['Karachi', 'Hyderabad', 'Sukkur'],
    next_stop: 'Bahawalpur',
    estimated_arrival: '08:00',
    delay_minutes: 0,
    speed_kmh: 100,
    progress_percent: 60
  },
  'bus-004': {
    bus_id: 'bus-004',
    bus_name: 'Swat Shuttle',
    from: 'Islamabad',
    to: 'Swat',
    current_location: { lat: 34.1688, lng: 73.2215, label: 'Mansehra' },
    stops_completed: ['Islamabad', 'Abbottabad'],
    next_stop: 'Mingora',
    estimated_arrival: '12:30',
    delay_minutes: 5,
    speed_kmh: 65,
    progress_percent: 70
  }
};

// GET /api/tracking/:bus_id — get live tracking for a bus (protected)
router.get('/:bus_id', verifyToken, (req, res) => {
  const data = trackingData[req.params.bus_id];
  if (!data) {
    return res.status(404).json({ error: 'Tracking data not available for this bus.' });
  }

  // Simulate slight location drift for live feel
  const jitter = () => (Math.random() - 0.5) * 0.001;
  const liveData = {
    ...data,
    current_location: {
      ...data.current_location,
      lat: data.current_location.lat + jitter(),
      lng: data.current_location.lng + jitter()
    },
    last_updated: new Date().toISOString()
  };

  res.json({ tracking: liveData });
});

module.exports = router;
