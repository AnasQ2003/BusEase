# BusEase — Monorepo

BusEase is a full-stack bus ticket booking application with a **React (Vite + TanStack Router)** frontend and a **Node.js + Express** REST API backend.

---

## 📁 Project Structure

```
BusEase/
├── frontend/             # React app (Vite + TanStack Router + Shadcn UI)
│   ├── src/
│   │   ├── routes/       # TanStack file-based routes
│   │   ├── components/   # Shared UI components
│   │   ├── lib/          # Stores, utilities
│   │   └── styles.css    # Global styles
│   └── package.json
│
├── backend/              # Express REST API
│   ├── config/           # DB / data store config
│   ├── middleware/        # JWT auth middleware
│   ├── routes/           # API route handlers
│   │   ├── auth.js       # Signup, signin, profile
│   │   ├── buses.js      # Bus search, seat layouts
│   │   ├── tickets.js    # Booking, history, cancellation
│   │   ├── tracking.js   # Live bus tracking
│   │   ├── notifications.js
│   │   └── wallet.js     # Balance, top-up, payments
│   ├── server.js         # Express entry point
│   └── .env              # Environment variables
│
├── package.json          # Root runner scripts
├── start-backend.bat     # Quick-start backend
└── start-frontend.bat    # Quick-start frontend
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm v9+

### 1. Install Dependencies

```bash
# Install all (from root)
npm run install:all

# Or individually:
cd backend && npm install
cd frontend && npm install
```

### 2. Configure Environment

Copy and edit the backend `.env`:
```bash
cd backend
copy .env.example .env
```
Edit `.env` with your JWT secret and desired port.

### 3. Start Development Servers

```bash
# From root — opens both in separate terminals (Windows)
npm run dev

# Or use the quick-start batch files:
start-backend.bat     # Backend on http://localhost:5000
start-frontend.bat    # Frontend on http://localhost:8080
```

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/signin` | Login |
| GET | `/api/auth/profile` | Get profile (🔒) |
| PUT | `/api/auth/profile` | Update profile (🔒) |
| GET | `/api/buses?from=&to=` | Search buses |
| GET | `/api/buses/:id` | Bus details |
| GET | `/api/buses/:id/seats` | Seat layout |
| POST | `/api/tickets` | Book ticket (🔒) |
| GET | `/api/tickets` | My tickets (🔒) |
| GET | `/api/tickets/:id` | Ticket detail (🔒) |
| DELETE | `/api/tickets/:id` | Cancel ticket (🔒) |
| GET | `/api/tracking/:bus_id` | Live tracking (🔒) |
| GET | `/api/notifications` | Notifications (🔒) |
| PATCH | `/api/notifications/:id/read` | Mark read (🔒) |
| PATCH | `/api/notifications/read-all` | Mark all read (🔒) |
| GET | `/api/wallet` | Wallet balance (🔒) |
| POST | `/api/wallet/topup` | Top up wallet (🔒) |
| POST | `/api/wallet/pay` | Pay via wallet (🔒) |

🔒 = Requires `Authorization: Bearer <token>` header

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TanStack Router, Shadcn UI, Tailwind CSS |
| Backend | Node.js, Express 4, JWT, bcryptjs |
| State | In-memory (swap out for SQL Server / PostgreSQL as needed) |
