<div align="center">

# 🚌 BusEase (Velocity) — Premium Bus Ticket Booking Platform

🎬 **Watch the Demo Video — Chat Application:** *(https://youtu.be/S_MUMI5wSzY)*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38BDF8.svg)](https://tailwindcss.com/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-v1-FF4154.svg)](https://tanstack.com/router)

**BusEase (Velocity)** is a state-of-the-art interstate bus ticket booking web application designed with a realistic iPhone 15 Pro hardware preview frame, real-time seat selection, live bus tracking, multi-country localization, and complete user profile persistence.

</div>

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

<table align="center">
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202021.png" width="100%"/><br/><b>1. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202027.png" width="100%"/><br/><b>2. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202033.png" width="100%"/><br/><b>3. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202041.png" width="100%"/><br/><b>4. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202047.png" width="100%"/><br/><b>5. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202055.png" width="100%"/><br/><b>6. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202101.png" width="100%"/><br/><b>7. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202108.png" width="100%"/><br/><b>8. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202117.png" width="100%"/><br/><b>9. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202129.png" width="100%"/><br/><b>10. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202147.png" width="100%"/><br/><b>11. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202239.png" width="100%"/><br/><b>12. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202244.png" width="100%"/><br/><b>13. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202407.png" width="100%"/><br/><b>14. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202413.png" width="100%"/><br/><b>15. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202418.png" width="100%"/><br/><b>16. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202423.png" width="100%"/><br/><b>17. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202428.png" width="100%"/><br/><b>18. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202434.png" width="100%"/><br/><b>19. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202448.png" width="100%"/><br/><b>20. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202453.png" width="100%"/><br/><b>21. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202457.png" width="100%"/><br/><b>22. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202504.png" width="100%"/><br/><b>23. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202517.png" width="100%"/><br/><b>24. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202521.png" width="100%"/><br/><b>25. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202538.png" width="100%"/><br/><b>26. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202545.png" width="100%"/><br/><b>27. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202551.png" width="100%"/><br/><b>28. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202555.png" width="100%"/><br/><b>29. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202600.png" width="100%"/><br/><b>30. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202605.png" width="100%"/><br/><b>31. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202610.png" width="100%"/><br/><b>32. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202617.png" width="100%"/><br/><b>33. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202625.png" width="100%"/><br/><b>34. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202636.png" width="100%"/><br/><b>35. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202641.png" width="100%"/><br/><b>36. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202644.png" width="100%"/><br/><b>37. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202654.png" width="100%"/><br/><b>38. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202703.png" width="100%"/><br/><b>39. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202708.png" width="100%"/><br/><b>40. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202714.png" width="100%"/><br/><b>41. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202721.png" width="100%"/><br/><b>42. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202728.png" width="100%"/><br/><b>43. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202733.png" width="100%"/><br/><b>44. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202736.png" width="100%"/><br/><b>45. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202741.png" width="100%"/><br/><b>46. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202748.png" width="100%"/><br/><b>47. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202752.png" width="100%"/><br/><b>48. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202755.png" width="100%"/><br/><b>49. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202758.png" width="100%"/><br/><b>50. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202857.png" width="100%"/><br/><b>51. Screenshot</b></td>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202859.png" width="100%"/><br/><b>52. Screenshot</b></td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="./screenshot/Screenshot%202026-07-24%20202910.png" width="100%"/><br/><b>53. Screenshot</b></td>
    <td align="center" width="50%"></td>
  </tr>
</table>

---

## 📄 License

```
MIT License

Copyright (c) BusEase --- 2026 AnasQ2003🚌 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👨‍💻 Author

**Anas Ahmed Qureshi** — [@AnasQ2003](https://github.com/AnasQ2003)

---

<div align="center">

Built with ❤️ by **Anas**

Made with 🔥 and a lot of ☕

**⭐ If you found this useful, please star the repository!**

</div>
