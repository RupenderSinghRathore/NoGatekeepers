# No GateKeepers

> Peer intelligence for first-generation college students — no networks required.

No GateKeepers is a college-specific intelligence platform built for first-generation students who are forced to navigate invisible rules without inherited access, insider guidance, or warm introductions. The project is designed to surface the time-sensitive, practical knowledge that often determines who gets scholarships, recommendations, interviews, and opportunities.

## Problem

First-generation college students consistently underperform not because they lack ability, but because they lack access to institutional knowledge that more privileged peers inherit informally.

Critical opportunities are often shaped by unwritten rules:

- Scholarship portals close without grace periods
- Professors give recommendations to students they already know from office hours
- High-placement clubs recruit through closed internal networks
- Department norms and hidden filters are rarely documented anywhere official

This invisible curriculum influences outcomes across academics, recruiting, funding, and mentorship. Most campuses already run on this knowledge layer. The problem is that it stays private.

## Solution

No GateKeepers makes that knowledge visible.

The platform gives students a college-specific feed of actionable, time-sensitive peer intelligence contributed by verified seniors. Instead of generic advice, students receive concrete signals such as:

- deadlines with real context
- faculty preferences that affect access
- hidden recruiting pipelines
- department-specific norms that are enforced informally

Each contribution is tagged by college, branch, and urgency, then reinforced through peer verification and credibility cues. Freshers do not have to discover critical information after the deadline has passed. They receive proactive nudges before the window closes.

## Features

- Filterable intelligence feed by college, branch, and urgency
- Structured tip submission flow for verified senior contributors
- Tip detail pages with peer verification and credibility scoring
- Academic calendar sidebar showing upcoming deadlines and time-sensitive events
- Personalized nudge experience based on saved college and branch preferences
- Admin moderation panel for approval, rejection, and manual review workflows
- Local preference storage using `localStorage`, so students do not need accounts
- Simple admin password gate as a temporary moderation control until proper auth is added
- Mock API layer for frontend development before the production backend is chosen

## Pages

- `/` — Feed
- `/submit` — Submit Tip
- `/tip/:id` — Tip Detail
- `/nudges` — My Nudges
- `/admin` — Admin Panel

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- TBD
- Intended options:
  - Go
  - Python FastAPI
  - Python Flask

### Architecture Notes

- No UI component library is used; the interface is built with custom components
- Student preferences are stored locally in `localStorage`
- Student authentication is intentionally not required in the current version
- Admin access is protected with a simple password gate for now and should be replaced with proper authentication later
- The frontend can run entirely against an in-memory mock API while the backend is still under development

## Project Structure

```text
NoGatekeepers/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── .env.example
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js
│   │   ├── components/
│   │   │   ├── AdminGate.jsx
│   │   │   ├── DeadlineCountdown.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Tags.jsx
│   │   │   ├── TipCard.jsx
│   │   │   ├── UrgencyBadge.jsx
│   │   │   └── VerificationBar.jsx
│   │   ├── config.js
│   │   ├── context/
│   │   │   ├── AdminAuthContext.jsx
│   │   │   └── PreferencesContext.jsx
│   │   ├── data/
│   │   │   └── mockData.js
│   │   ├── pages/
│   │   │   ├── AdminPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── NudgesPage.jsx
│   │   │   ├── SubmitPage.jsx
│   │   │   └── TipDetailPage.jsx
│   │   ├── utils/
│   │   │   └── date.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
├── backend/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Clone the repository

```bash
git clone <your-repo-url>
cd NoGatekeepers
```

### Install dependencies

```bash
cd frontend
npm install
```

### Start the development server

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal, typically:

```text
http://localhost:5173
```

## Development Mode

The project currently defaults to mock mode.

In `frontend/src/config.js`:

```js
export const BASE_URL = "http://localhost:8000";
export const USE_MOCK_API = true;
```

When `USE_MOCK_API` is `true`, the app uses in-memory data from `frontend/src/data/mockData.js` and does not require a backend server.

## API Contract

The frontend is already structured around a simple REST-style API contract. Even when mock mode is enabled, these are the endpoints the real backend is expected to implement.

### Tips

#### `GET /api/tips`

Returns the list of tips shown in the main feed and reused across the app.

Expected use cases:

- main feed rendering
- nudges filtering
- admin moderation queue
- related tip lookups

#### `GET /api/tips/:id`

Returns one tip by ID for the tip detail page.

Expected response includes fields such as:

- `id`
- `title`
- `category`
- `college`
- `branch`
- `urgency`
- `deadlineDate`
- `description`
- `whatMostPeopleMiss`
- `verificationCount`
- `verifiedBy`
- `credibilityScore`
- `postedBy`
- `status`

#### `POST /api/tips`

Creates a new tip submission.

Purpose:

- used by the `/submit` page
- intended for senior contributors
- should create a tip in `pending` state for moderation

Typical payload shape:

```json
{
  "title": "Prof. X prioritizes students who attend office hours before recommendation season",
  "category": "Faculty",
  "college": "NIT Trichy",
  "branch": "CSE",
  "urgency": "Critical",
  "deadlineDate": "2026-05-25T00:00:00.000Z",
  "description": "Short contextual explanation.",
  "whatMostPeopleMiss": "The unwritten rule students usually discover too late."
}
```

#### `POST /api/tips/:id/verify`

Adds a peer verification to a tip and updates social proof / credibility metadata.

Purpose:

- increase verification count
- reflect that a peer has confirmed the tip
- potentially increase credibility score

#### `POST /api/tips/:id/review`

Moderation endpoint for admin review.

Typical payload:

```json
{
  "status": "approved"
}
```

Supported statuses should at minimum cover:

- `approved`
- `pending`
- `rejected`
- `flagged`

#### `POST /api/tips/:id/flag`

Marks a tip for moderation or concern.

Purpose:

- signal questionable content
- support manual review flow in the admin panel

### Calendar

#### `GET /api/calendar`

Returns upcoming academic or opportunity-related deadline items for the calendar sidebar.

Typical item shape:

```json
{
  "id": "cal-1",
  "title": "MCM scholarship document freeze",
  "college": "Jadavpur University",
  "branch": "All",
  "deadlineDate": "2026-05-24T00:00:00.000Z"
}
```

## How Backend Swap Works

The frontend is already prepared to switch from mock data to a real backend with minimal changes.

### Current config

File: `frontend/src/config.js`

```js
export const BASE_URL = "http://localhost:8000";
export const USE_MOCK_API = true;
```

### To connect a real backend

1. Set `BASE_URL` to your backend origin if it is not `http://localhost:8000`
2. Change `USE_MOCK_API` from `true` to `false`
3. Implement the API contract above in the backend
4. Ensure the backend accepts requests from the frontend origin

Example:

```js
export const BASE_URL = "http://localhost:8000";
export const USE_MOCK_API = false;
```

No page-level code should need to change as long as the backend returns the expected data shapes.

## CORS Note For Backend Implementers

The frontend runs on Vite during development, usually at:

```text
http://localhost:5173
```

Whoever implements the backend must allow this origin in CORS during local development.

At minimum, the backend should:

- allow origin `http://localhost:5173`
- allow `GET` and `POST`
- allow `Content-Type` headers
- return JSON responses consistently

This is especially important if the backend is built in:

- FastAPI using `CORSMiddleware`
- Flask using `flask-cors`
- Go using a CORS middleware or explicit headers

## Data and State Notes

### Student preferences

Student preferences are stored locally via `localStorage` so users can personalize nudges without signing in.

Current storage key:

```text
cip-user-preferences
```

Stored values include:

- `college`
- `branch`

### Admin access

The admin panel currently uses a simple password gate in the frontend. This is intentionally temporary and should be replaced by real authentication and authorization before any production deployment.

## Contributing

Contributions are welcome, especially around:

- backend implementation
- moderation workflows
- credibility scoring logic
- accessibility improvements
- performance and responsiveness
- better submission review tooling

### Suggested contribution flow

1. Fork the repository
2. Create a feature branch
3. Make focused changes
4. Test locally with `npm run dev`
5. Open a pull request with a clear description of what changed and why

### Contribution guidelines

- Keep components custom and lightweight
- Preserve the project’s focus on actionable peer intelligence, not generic social features
- Avoid adding heavy dependencies unless they solve a clear problem
- If you implement the backend, follow the API contract already defined in `frontend/src/api/index.js`

## License

MIT
