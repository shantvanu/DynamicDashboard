# Dynamic Portfolio Dashboard

This project is a full-stack implementation of a real-time stock portfolio dashboard, built as part of the **Full Stack Engineer Technical Assignment** for **8byte**.

The application displays portfolio holdings, sector-level summaries, and live market metrics such as CMP, Present Value, and Gain/Loss using real-time updates.

The live Deployment link of the project is : https://portfolio-dynamic-dashboard.netlify.app/

---
## Tech Stack Used

### Frontend
- Next.js (React – App Router)
- TypeScript
- Tailwind CSS
- @tanstack/react-table

### Backend
- Node.js
- Express
- TypeScript
- WebSockets
- Redis (for caching)
---
## Features Implemented

- Portfolio table showing:
  - Stock name
  - Purchase price & quantity
  - Investment & portfolio percentage
  - Exchange (NSE/BSE)
  - CMP (Current Market Price)
  - Present value
  - Gain/Loss (color-coded)
  - P/E ratio & latest earnings
- Sector-wise summary cards:
  - Total investment
  - Total present value
  - Sector gain/loss
- Real-time updates using WebSockets
- Redis caching to reduce repeated API calls
- Graceful handling of external API failures

---

## Architecture Overview

- The backend fetches market data from Yahoo Finance and Google Finance using unofficial endpoints.
- Data is cached in Redis to handle rate limits and improve performance.
- Updated portfolio data is broadcast to clients using WebSockets.
- The frontend subscribes to WebSocket updates and renders data in real time.

Frontend does **not** poll the backend repeatedly — it only reacts to pushed updates.
---
## Project Structure

DynamicDashboard/
├── backend/
│ ├── src/
│ │ ├── services/
│ │ ├── websocket/
│ │ ├── cache/
│ │ └── server.ts
│ └── package.json
│
├── frontend/
│ ├── app/
│ ├── components/
│ ├── hooks/
│ ├── types/
│ └── package.json
│
└── README.md
---

## Setup Instructions

### Prerequisites
- Node.js (v18 or above)
- Redis (running locally or hosted)

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
Backend will run on:

http://localhost:4000
Portfolio API:

http://localhost:4000/api/portfolio
WebSocket endpoint:

ws://localhost:4000
Frontend Setup

cd frontend
npm install
npm run dev
Frontend will be available at:

http://localhost:3000


-- Notes on Financial APIs
Yahoo Finance and Google Finance do not provide official public APIs.

Unofficial endpoints are used with defensive parsing.

Fallback logic is implemented when data is unavailable.

Caching is used to reduce API load and prevent blocking.

--Assumptions & Limitations
Portfolio data is static (simulating Excel input).

Market data accuracy depends on unofficial sources.

No authentication is implemented (single-user view).

Possible Improvements
Persist portfolio data in a database

Add historical price charts

Support multiple users

Improve mobile responsiveness

Add monitoring and logging

Author
Shantvanu Mutha

Built as part of the 8byte Full Stack Engineer technical assignment.
