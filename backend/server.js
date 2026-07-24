require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check & Root Endpoints
app.get('/', (req, res) => {
  res.json({
    app: 'BusEase API',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      buses: '/api/buses',
      tickets: '/api/tickets',
      tracking: '/api/tracking',
      notifications: '/api/notifications',
      wallet: '/api/wallet'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'BusEase API', timestamp: new Date() });
});

// Route registration
app.use('/api/auth', require('./routes/auth'));
app.use('/api/buses', require('./routes/buses'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/tracking', require('./routes/tracking'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/wallet', require('./routes/wallet'));

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🟢 BusEase API running on http://localhost:${PORT}`);
});
