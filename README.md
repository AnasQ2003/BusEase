# 🚌 BusEase (Velocity) — Premium Bus Ticket Booking Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38BDF8.svg)](https://tailwindcss.com/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-v1-FF4154.svg)](https://tanstack.com/router)

**BusEase (Velocity)** is a state-of-the-art interstate bus ticket booking web application designed with a realistic iPhone 15 Pro hardware preview frame, real-time seat selection, live bus tracking, multi-country localization, and complete user profile persistence.

---

## 📽️ Project Demo Video

[![Watch Project Demo Video](https://youtu.be/S_MUMI5wSzY)

> 💡 *Click the thumbnail above to watch the full walkthrough video on YouTube. (Replace `PLACEHOLDER_VIDEO_ID` with your actual YouTube video link).*

---

## ✨ Key Features

### 📱 1. Realistic iPhone 15 Pro Hardware Frame
- **Titanium Chassis Mockup**: Custom CSS titanium gradient chassis with physical side buttons (Silent switch, Volume Up/Down, Power button), screen edge glare, and drop shadows.
- **Dynamic Island & Live Status Bar**: Real-time digital clock, cellular signal, Wi-Fi, and battery indicator.
- **Frosted Glass Scrims**: Scrollable content dissolves seamlessly under the status bar (`backdrop-filter: blur(16px)`) and bottom home indicator bar.
- **In-App Toast Container**: All popup notifications render directly inside the mobile phone screen.

### 🔐 2. Authentication & User Persistence
- **Single User Credentials**: Pre-configured registered account: `anas@example.com` / `anas123`.
- **Remember Me Functionality**: Persists credentials in `localStorage` (`velocity_remember_me`) with automatic form pre-filling on mount.
- **Social Login Placeholders**: Interactive Apple and Google login options with instant in-app toast feedback (`"Feature coming soon!"`).

### 🚍 3. Interactive Route Search & Multi-Filter Engine
- **Dynamic Filtering**: Real-time filtering by **All**, **AC Sleeper**, **Non-AC**, **Volvo**, **Under ₹1,500**, and **Morning** departures.
- **Swap Origin/Destination**: One-tap city reversal with smooth animation.
- **Multi-Country Hubs**: Native support for Pakistan (`PK`), India (`IN`), and international travel hubs with localized currency formatting (`Rs.`, `₹`, `$`).

### 🎫 4. Seat Map, Booking & E-Ticket Management
- **Interactive Seat Selection Map**: Visual sleeper berth and seat layouts with instant price calculations.
- **My Trips Dashboard**: Filter trips by `Upcoming`, `Completed`, and `Cancelled`.
- **Instant E-Ticket & Boarding Pass**: Complete PNR generator, QR code preview, driver details, and live trip status updates.

### 🎧 5. Dedicated Help Center & Customer Support (`/help`)
- **24/7 Live Support**: Quick triggers for Live Chat, Toll-Free Calls, and Email Support tickets.
- **Searchable FAQ Accordion**: Instant answers for Bookings, Refunds, Tracking, Luggage allowances, and Payment options.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, TanStack Router, Tailwind CSS, Lucide React, Sonner Toast
- **State Management**: Zustand / Custom Local Stores (`user-store.ts`, `tickets-store.ts`)
- **Backend**: Node.js, Express.js
- **Build Tools**: Vite, PostCSS, Autoprefixer

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### 1. Clone & Install Dependencies
```bash
# Navigate to project directory
cd BusEase

# Install Frontend dependencies
cd frontend
npm install

# Install Backend dependencies
cd ../backend
npm install
```

### 2. Run Development Servers
```bash
# Run Backend Server (port 5000)
cd backend
npm run dev

# Run Frontend Development Server (port 5173 / 3000)
cd ../frontend
npm run dev
```

Open `http://localhost:5173` in your browser to view the application inside the realistic iPhone preview frame.

---

## 📁 Project Directory Structure

```
BusEase/
├── screenshot/                 # 53 High-Resolution Application Screenshots
├── backend/                    # Express.js REST API Server
│   ├── src/
│   │   ├── index.ts
│   │   └── routes/
│   ├── package.json
│   └── tsconfig.json
└── frontend/                   # React + TypeScript Frontend Application
    ├── src/
    │   ├── components/
    │   │   ├── mobile-frame.tsx   # iPhone 15 Pro Hardware Mockup Frame
    │   │   ├── top-bar.tsx       # Top Bar Header
    │   │   ├── bottom-nav.tsx    # Aligned Bottom Navigation Bar
    │   │   ├── side-drawer.tsx   # Side Navigation Drawer
    │   │   └── ui/              # Reusable UI Components & Toaster
    │   ├── lib/
    │   │   ├── user-store.ts     # User Profile & Country Store
    │   │   └── tickets-store.ts  # Ticket & Trip Overrides Store
    │   ├── routes/
    │   │   ├── index.tsx        # Splash Screen
    │   │   ├── signin.tsx       # Sign In & Registration Screen
    │   │   ├── home.tsx         # Home Dashboard & Search Card
    │   │   ├── search.tsx       # Bus Search & Filter Screen
    │   │   ├── seats.tsx        # Interactive Seat Map
    │   │   ├── payment.tsx      # Payment Gateway Checkout
    │   │   ├── ticket.tsx       # Digital E-Ticket View
    │   │   ├── tickets.tsx      # My Trips Dashboard
    │   │   ├── help.tsx         # Help Center & 24/7 Support
    │   │   ├── profile.tsx      # User Profile Management
    │   │   ├── wallet.tsx       # Offers & Wallet Balance
    │   │   ├── live-track.tsx   # Real-time Bus GPS Tracker
    │   │   ├── terms.tsx        # Terms of Service
    │   │   └── privacy.tsx      # Privacy Policy
    │   └── styles.css
    ├── package.json
    └── vite.config.ts
```

---

## 📸 Application Screenshots Gallery (53 Screenshots)

All 53 application screenshots captured during development are archived in the [`/screenshot`](./screenshot) directory and displayed below:

| # | Screenshot Preview | Filename |
|---|-------------------|----------|
| 1 | ![Screenshot 1](./screenshot/Screenshot%202026-07-24%20202021.png) | `Screenshot 2026-07-24 202021.png` |
| 2 | ![Screenshot 2](./screenshot/Screenshot%202026-07-24%20202027.png) | `Screenshot 2026-07-24 202027.png` |
| 3 | ![Screenshot 3](./screenshot/Screenshot%202026-07-24%20202033.png) | `Screenshot 2026-07-24 202033.png` |
| 4 | ![Screenshot 4](./screenshot/Screenshot%202026-07-24%20202041.png) | `Screenshot 2026-07-24 202041.png` |
| 5 | ![Screenshot 5](./screenshot/Screenshot%202026-07-24%20202047.png) | `Screenshot 2026-07-24 202047.png` |
| 6 | ![Screenshot 6](./screenshot/Screenshot%202026-07-24%20202055.png) | `Screenshot 2026-07-24 202055.png` |
| 7 | ![Screenshot 7](./screenshot/Screenshot%202026-07-24%20202101.png) | `Screenshot 2026-07-24 202101.png` |
| 8 | ![Screenshot 8](./screenshot/Screenshot%202026-07-24%20202108.png) | `Screenshot 2026-07-24 202108.png` |
| 9 | ![Screenshot 9](./screenshot/Screenshot%202026-07-24%20202117.png) | `Screenshot 2026-07-24 202117.png` |
| 10 | ![Screenshot 10](./screenshot/Screenshot%202026-07-24%20202129.png) | `Screenshot 2026-07-24 202129.png` |
| 11 | ![Screenshot 11](./screenshot/Screenshot%202026-07-24%20202147.png) | `Screenshot 2026-07-24 202147.png` |
| 12 | ![Screenshot 12](./screenshot/Screenshot%202026-07-24%20202239.png) | `Screenshot 2026-07-24 202239.png` |
| 13 | ![Screenshot 13](./screenshot/Screenshot%202026-07-24%20202244.png) | `Screenshot 2026-07-24 202244.png` |
| 14 | ![Screenshot 14](./screenshot/Screenshot%202026-07-24%20202407.png) | `Screenshot 2026-07-24 202407.png` |
| 15 | ![Screenshot 15](./screenshot/Screenshot%202026-07-24%20202413.png) | `Screenshot 2026-07-24 202413.png` |
| 16 | ![Screenshot 16](./screenshot/Screenshot%202026-07-24%20202418.png) | `Screenshot 2026-07-24 202418.png` |
| 17 | ![Screenshot 17](./screenshot/Screenshot%202026-07-24%20202423.png) | `Screenshot 2026-07-24 202423.png` |
| 18 | ![Screenshot 18](./screenshot/Screenshot%202026-07-24%20202428.png) | `Screenshot 2026-07-24 202428.png` |
| 19 | ![Screenshot 19](./screenshot/Screenshot%202026-07-24%20202434.png) | `Screenshot 2026-07-24 202434.png` |
| 20 | ![Screenshot 20](./screenshot/Screenshot%202026-07-24%20202448.png) | `Screenshot 2026-07-24 202448.png` |
| 21 | ![Screenshot 21](./screenshot/Screenshot%202026-07-24%20202453.png) | `Screenshot 2026-07-24 202453.png` |
| 22 | ![Screenshot 22](./screenshot/Screenshot%202026-07-24%20202457.png) | `Screenshot 2026-07-24 202457.png` |
| 23 | ![Screenshot 23](./screenshot/Screenshot%202026-07-24%20202504.png) | `Screenshot 2026-07-24 202504.png` |
| 24 | ![Screenshot 24](./screenshot/Screenshot%202026-07-24%20202517.png) | `Screenshot 2026-07-24 202517.png` |
| 25 | ![Screenshot 25](./screenshot/Screenshot%202026-07-24%20202521.png) | `Screenshot 2026-07-24 202521.png` |
| 26 | ![Screenshot 26](./screenshot/Screenshot%202026-07-24%20202538.png) | `Screenshot 2026-07-24 202538.png` |
| 27 | ![Screenshot 27](./screenshot/Screenshot%202026-07-24%20202545.png) | `Screenshot 2026-07-24 202545.png` |
| 28 | ![Screenshot 28](./screenshot/Screenshot%202026-07-24%20202551.png) | `Screenshot 2026-07-24 202551.png` |
| 29 | ![Screenshot 29](./screenshot/Screenshot%202026-07-24%20202555.png) | `Screenshot 2026-07-24 202555.png` |
| 30 | ![Screenshot 30](./screenshot/Screenshot%202026-07-24%20202600.png) | `Screenshot 2026-07-24 202600.png` |
| 31 | ![Screenshot 31](./screenshot/Screenshot%202026-07-24%20202605.png) | `Screenshot 2026-07-24 202605.png` |
| 32 | ![Screenshot 32](./screenshot/Screenshot%202026-07-24%20202610.png) | `Screenshot 2026-07-24 202610.png` |
| 33 | ![Screenshot 33](./screenshot/Screenshot%202026-07-24%20202617.png) | `Screenshot 2026-07-24 202617.png` |
| 34 | ![Screenshot 34](./screenshot/Screenshot%202026-07-24%20202625.png) | `Screenshot 2026-07-24 202625.png` |
| 35 | ![Screenshot 35](./screenshot/Screenshot%202026-07-24%20202636.png) | `Screenshot 2026-07-24 202636.png` |
| 36 | ![Screenshot 36](./screenshot/Screenshot%202026-07-24%20202641.png) | `Screenshot 2026-07-24 202641.png` |
| 37 | ![Screenshot 37](./screenshot/Screenshot%202026-07-24%20202644.png) | `Screenshot 2026-07-24 202644.png` |
| 38 | ![Screenshot 38](./screenshot/Screenshot%202026-07-24%20202654.png) | `Screenshot 2026-07-24 202654.png` |
| 39 | ![Screenshot 39](./screenshot/Screenshot%202026-07-24%20202703.png) | `Screenshot 2026-07-24 202703.png` |
| 40 | ![Screenshot 40](./screenshot/Screenshot%202026-07-24%20202708.png) | `Screenshot 2026-07-24 202708.png` |
| 41 | ![Screenshot 41](./screenshot/Screenshot%202026-07-24%20202714.png) | `Screenshot 2026-07-24 202714.png` |
| 42 | ![Screenshot 42](./screenshot/Screenshot%202026-07-24%20202721.png) | `Screenshot 2026-07-24 202721.png` |
| 43 | ![Screenshot 43](./screenshot/Screenshot%202026-07-24%20202728.png) | `Screenshot 2026-07-24 202728.png` |
| 44 | ![Screenshot 44](./screenshot/Screenshot%202026-07-24%20202733.png) | `Screenshot 2026-07-24 202733.png` |
| 45 | ![Screenshot 45](./screenshot/Screenshot%202026-07-24%20202736.png) | `Screenshot 2026-07-24 202736.png` |
| 46 | ![Screenshot 46](./screenshot/Screenshot%202026-07-24%20202741.png) | `Screenshot 2026-07-24 202741.png` |
| 47 | ![Screenshot 47](./screenshot/Screenshot%202026-07-24%20202748.png) | `Screenshot 2026-07-24 202748.png` |
| 48 | ![Screenshot 48](./screenshot/Screenshot%202026-07-24%20202752.png) | `Screenshot 2026-07-24 202752.png` |
| 49 | ![Screenshot 49](./screenshot/Screenshot%202026-07-24%20202755.png) | `Screenshot 2026-07-24 202755.png` |
| 50 | ![Screenshot 50](./screenshot/Screenshot%202026-07-24%20202758.png) | `Screenshot 2026-07-24 202758.png` |
| 51 | ![Screenshot 51](./screenshot/Screenshot%202026-07-24%20202857.png) | `Screenshot 2026-07-24 202857.png` |
| 52 | ![Screenshot 52](./screenshot/Screenshot%202026-07-24%20202859.png) | `Screenshot 2026-07-24 202859.png` |
| 53 | ![Screenshot 53](./screenshot/Screenshot%202026-07-24%20202910.png) | `Screenshot 2026-07-24 202910.png` |

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
