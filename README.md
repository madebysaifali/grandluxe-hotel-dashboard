# 🏨 GrandLuxe – Room Booking Dashboard

A frontend-only Room Booking Dashboard built with React.js as part of a
technical assignment.

## Features

- 🤖 AI-Assisted Development: Developed by me with strategic AI assistance for UI
    architecture, code optimization, and responsive logic.
- 📱 Mobile-First Responsive Design: Fully optimized for all screen sizes (Mobile,
     Tablet, Desktop) using custom CSS Media Queries.
- 🏗️ Clean Code Architecture: Logic (JS) and presentation (CSS) are strictly
    separated into dedicated folders for better maintainability.
- ⚡ Optimized Performance: Uses React.memo and useCallback to prevent unnecessary
     re-renders.
- 🔐 Login page with mock authentication and form validation
- 🏠 Room listing dashboard with search and filter
- 📅 Room detail page with date selection and availability check
- ✅ Booking confirmation with loading states
- 📋 My Bookings page with all reservations
- ⚠️ Full error handling, empty states, and loading indicators
- 📱 Responsive design

## Tech Stack

- React.js (Create React App)
- Context API + useReducer for state management
- Functional components with hooks
- No external UI libraries (pure CSS)
- Frontend: React.js (Create React App)
- State Management: Context API + useReducer
- Styling: Pure CSS3 (Custom Properties & Media Queries)
- Deployment: Vercel

## Setup Instructions

### Prerequisites

- Node.js v16+ installed
- npm or yarn

### Steps

1. **Clone or download the project**

   ```bash
   cd room-booking-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Demo Credentials

| Field    | Value          |
| -------- | -------------- |
| Email    | demo@hotel.com |
| Password | demo123        |

## Folder Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.js
│   ├── Input.js
│   ├── Navbar.js
│   ├── Notification.js
│   └── RoomCard.js
├── context/
│   └── AppContext.js  # Global state (useReducer + Context API)
├── pages/
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── RoomDetailPage.js
│   └── BookingsPage.js
├── services/
│   └── api.js        # Mock API functions (simulated delays)
├── App.js            # Root component with page routing
├── index.js
└── index.css         # Global styles
```

## Build for Production

```bash
npm run build
```
