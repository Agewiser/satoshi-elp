# Elite Learning Programme — React + Node.js

**Satoshi Media · Plot 8 The Providence Street, Lekki Phase 1, Lagos**

---

## Architecture

```
elp/
├── .env.example            ← SINGLE source of truth for ALL config
├── package.json            ← Root package: Express backend scripts
│
├── server/
│   ├── index.js            ← Express backend (API, DB, Groq proxy)
│   └── data/               ← SQLite database (auto-created on first run)
│
└── client/                 ← React frontend (Vite)
    ├── vite.config.js      ← Dev proxy: /api → localhost:3000
    ├── index.html
    └── src/
        ├── hooks/
        │   ├── useConfig.js      ← ALL .env vars, one place, used everywhere
        │   └── useTracking.js    ← Page tracking, events, FB pixel
        ├── components/
        │   ├── Layout.jsx        ← Wraps all pages (Navbar, Footer, FAB, Chat, Ticker)
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   └── WAButton.jsx      ← Also exports FomoTicker, ChatWidget
        └── pages/
            ├── Home.jsx
            ├── About.jsx
            ├── Services.jsx
            ├── Assessment.jsx
            └── Admin.jsx
```

---

## The .env Pattern

**All site-wide values live in ONE place: `.env`**

`VITE_` prefixed variables are automatically available in React via `import.meta.env.VITE_*`. Vite bakes them into the build. Non-`VITE_` variables (JWT_SECRET, GROQ_API_KEY etc.) stay server-side only — never exposed to the browser.

To change ANY detail on the site (WhatsApp number, business name, address, Pixel ID):
1. Edit `.env`
2. Run `npm run build`
3. Done — no searching through HTML files

---

## Setup

### 1. Install all dependencies
```bash
# Install server deps
npm install

# Install client deps
cd client && npm install && cd ..
```

### 2. Configure environment
```bash
cp .env.example .env
```

Edit `.env` — fill in every value:
- `JWT_SECRET` — any long random string (64+ chars)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — your admin login
- `GROQ_API_KEY` — from console.groq.com
- `VITE_FB_PIXEL_ID` — your Facebook Pixel ID
- `VITE_WHATSAPP_NUMBER` — international format, no + (e.g. 2348012345678)
- All `VITE_BUSINESS_*` values — your details are already there

### 3. Development (two terminals)
```bash
# Terminal 1: Start Express backend
npm run dev:server

# Terminal 2: Start Vite React frontend
npm run dev:client

# OR both at once:
npm run dev
```

Visit `http://localhost:5173` — Vite proxies all `/api` calls to Express on port 3000.

### 4. Production build
```bash
# Build React into client/dist
npm run build

# Start production server (serves React build + API)
npm start
```

---

## Deploying to Railway

1. Push this folder to a GitHub repo
2. Go to railway.app → New Project → Deploy from GitHub
3. In Railway dashboard, go to Variables and add ALL your `.env` values
4. Add a build command: `npm install && npm run build`
5. Add a start command: `npm start`
6. Railway detects Node.js and deploys automatically
7. Add your custom domain in Railway settings

---

## Admin Dashboard

Navigate to `/admin`. Login with the credentials set in `.env`.

**Features:**
- Analytics: total assessments, pipeline (New/Contacted/Enrolled), page views, WA clicks
- Assessments: full table with search, status filters, status updates, direct WhatsApp link per parent
- Page Views: breakdown by route
- CSV Export: one click
- Detail panel: full view of any submission

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/assessment` | — | Submit assessment |
| POST | `/api/track` | — | Track page view |
| POST | `/api/event` | — | Track custom event |
| GET | `/api/ticker` | — | FOMO ticker messages |
| POST | `/api/chat` | — | Groq AI chat proxy |
| POST | `/api/admin/login` | — | Get JWT token |
| GET | `/api/admin/assessments` | JWT | List assessments |
| GET | `/api/admin/assessments/:id` | JWT | Single assessment |
| POST | `/api/admin/assessments/:id/status` | JWT | Update status |
| GET | `/api/admin/analytics` | JWT | Full analytics |
| GET | `/api/admin/export` | JWT | CSV download |

---

## Facebook Pixel Events

| Event | Trigger |
|-------|---------|
| `PageView` | Every route change (automatic) |
| `Lead` | Assessment form submitted |
| `Contact` | WhatsApp button clicked |
| `ViewContent` | CTA buttons on homepage |
| `report_download` | Sample report link clicked |
