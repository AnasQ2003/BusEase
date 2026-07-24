const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// In-memory notification store (pre-seeded per user lookup)
const defaultNotifications = [
  {
    id: 'notif-001',
    type: 'booking',
    title: 'Ticket Confirmed! 🎉',
    message: 'Your ticket for City Express (Lahore → Islamabad) on July 25 is confirmed.',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: 'notif-002',
    type: 'offer',
    title: 'Exclusive Offer! 💸',
    message: 'Get 20% off your next booking with code BUSEASE20. Valid till July 31.',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: 'notif-003',
    type: 'tracking',
    title: 'Your Bus is On the Way 🚌',
    message: 'Road Runner (Lahore → Islamabad) has departed. ETA: 3h 20m.',
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  }
];

const userNotifications = {}; // userId → notifications[]

function getNotifications(userId) {
  if (!userNotifications[userId]) {
    userNotifications[userId] = defaultNotifications.map(n => ({ ...n, user_id: userId }));
  }
  return userNotifications[userId];
}

// GET /api/notifications — get all notifications for user (protected)
router.get('/', verifyToken, (req, res) => {
  const notifications = getNotifications(req.user.id);
  res.json({ count: notifications.length, notifications });
});

// PATCH /api/notifications/:id/read — mark one as read (protected)
router.patch('/:id/read', verifyToken, (req, res) => {
  const notifications = getNotifications(req.user.id);
  const notif = notifications.find(n => n.id === req.params.id);
  if (!notif) return res.status(404).json({ error: 'Notification not found.' });

  notif.read = true;
  res.json({ message: 'Notification marked as read.', notification: notif });
});

// PATCH /api/notifications/read-all — mark all as read (protected)
router.patch('/read-all', verifyToken, (req, res) => {
  const notifications = getNotifications(req.user.id);
  notifications.forEach(n => (n.read = true));
  res.json({ message: 'All notifications marked as read.' });
});

module.exports = router;
