# Notes App

A full-stack Notes Application built using **React, TypeScript, Express, and SQLite**.

The application demonstrates a small but production-oriented product slice with CRUD operations, search, filtering, sorting, pagination, auto-save, optimistic updates, offline detection, keyboard shortcuts, responsive UI, accessibility, and dark mode.

---

## Features

### Frontend

* List all notes
* Create new notes
* Edit existing notes
* Delete notes with confirmation dialog
* Search notes by title and content
* Debounced search
* Filter notes by tag
* Sort notes by:

  * Title
  * Created date
  * Updated date
* Pagination support
* Auto-save while editing with debounce
* Optimistic UI updates for deletion
* Loading state handling
* Empty state handling
* Error state handling
* Offline state detection
* Dark mode with persistent theme preference
* Keyboard shortcut support
* Responsive design for mobile and desktop
* Accessible form labels and semantic HTML
* Keyboard-friendly interactions

### Backend

* Create Note API
* Get All Notes API
* Get Single Note API
* Update Note API
* Delete Note API
* Search Notes
* Filter Notes by Tag
* Sort Notes
* Pagination
* Tags API with usage counts
* Request validation using Zod
* SQLite persistence
* Layered architecture
* Consistent API error handling

---

## Tech Stack

### Frontend

| Technology   | Purpose                              |
| ------------ | ------------------------------------ |
| React        | UI development                       |
| TypeScript   | Type safety                          |
| Vite         | Development and build tooling        |
| React Query  | Server state and API data management |
| Axios        | HTTP communication                   |
| Tailwind CSS | Responsive and utility-based styling |
| Vitest       | Unit/integration testing             |

### Backend

| Technology     | Purpose                 |
| -------------- | ----------------------- |
| Node.js        | Runtime                 |
| Express.js     | REST API framework      |
| TypeScript     | Type safety             |
| SQLite         | Lightweight persistence |
| Better SQLite3 | SQLite database access  |
| Zod            | Request validation      |

### Why These Technologies?

**React + TypeScript**

React provides a component-based UI architecture, while TypeScript helps catch type-related issues during development and makes the codebase easier to maintain.

**React Query**

React Query was chosen to handle server state, caching, loading/error states, and mutations without manually managing API state throughout the application.

**SQLite**

SQLite was selected because this application does not require a heavy database setup. It provides reliable persistence while keeping local development simple.

**Zod**

Zod provides runtime request validation and clear validation errors at the API boundary.

**Tailwind CSS**

Tailwind allows responsive and consistent styling without introducing a large custom CSS layer.

---

## Project Structure

```text
notes-app/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── notes/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── validations/
│   │   └── server.ts
│   │
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### Notes

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | `/api/notes`     | Get all notes  |
| GET    | `/api/notes/:id` | Get note by ID |
| POST   | `/api/notes`     | Create note    |
| PATCH  | `/api/notes/:id` | Update note    |
| DELETE | `/api/notes/:id` | Delete note    |

### Query Parameters

#### Search

```http
GET /api/notes?search=react
```

Searches across note title and content.

#### Filter by Tag

```http
GET /api/notes?tag=frontend
```

Returns notes containing the specified tag.

#### Sort

```http
GET /api/notes?sort=updatedAt
```

Supported sorting options include:

* `title`
* `createdAt`
* `updatedAt`

#### Pagination

```http
GET /api/notes?page=1&limit=10
```

Supports page-based pagination.

---

### Tags

| Method | Endpoint    | Description                       |
| ------ | ----------- | --------------------------------- |
| GET    | `/api/tags` | Get unique tags with usage counts |

Example response:

```json
[
  {
    "name": "react",
    "count": 5
  },
  {
    "name": "frontend",
    "count": 3
  }
]
```

---

## Note Data Model

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "tags": ["react", "frontend"],
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

---

## Setup

### Prerequisites

* Node.js
* npm

### Clone Repository

```bash
git clone <repository-url>
cd notes-app
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
```

Start the backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Running Tests

From the frontend directory:

```bash
npm test
```

The project uses **Vitest** and React Testing Library.

The testing approach focuses on meaningful user-facing behavior and important application logic rather than trying to achieve 100% code coverage.

---

## Architecture

### Frontend

The frontend follows a component and hook-based architecture.

```text
Page
 ↓
Components
 ↓
Custom Hooks
 ↓
React Query
 ↓
API Layer
 ↓
Backend
```

API communication is kept separate from UI components.

React Query is responsible for:

* Server state management
* Data fetching
* Cache management
* Loading states
* Error states
* Mutations
* Optimistic updates

### Backend

The backend follows a layered architecture:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Database
```

#### Route

Defines the HTTP endpoint and connects it to the appropriate controller.

#### Controller

Handles HTTP-specific concerns such as:

* Request parameters
* Request body
* Response status
* Error responses

#### Service

Contains application/business logic and keeps database operations separate from HTTP handling.

#### Database

Handles SQLite persistence.

---

## Optimistic Updates

Delete operations use optimistic UI updates.

The flow is:

```text
User clicks Delete
       ↓
Confirmation Dialog
       ↓
Remove note from UI immediately
       ↓
Send DELETE request
       ↓
       ├── Success → Keep UI updated
       │
       └── Failure → Roll back previous state
```

This provides a faster user experience while still handling API failures safely.

---

## Auto-Save

Editing a note uses debounced auto-save.

```text
User edits note
      ↓
Wait for debounce period
      ↓
Check whether content changed
      ↓
Send PATCH request
      ↓
Show "Saving..."
      ↓
Show "Saved"
```

This prevents an API request from being sent for every keystroke.

---

## Search

Search input is debounced before making the API request.

```text
User types
    ↓
Debounce
    ↓
Search API
    ↓
React Query
    ↓
Updated notes
```

This reduces unnecessary backend requests while typing.

---

## Dark Mode

Dark mode was implemented as an optional bonus feature.

The theme:

* Uses Tailwind CSS dark-mode utilities
* Persists the user's preference in `localStorage`
* Applies the theme using the `dark` class on the document
* Does not require additional external dependencies

---

## Keyboard Shortcuts

The application supports keyboard-friendly interactions, including:

* `Escape` while editing → exits edit mode

Additional shortcuts can be added as the application grows.

---

## Offline Detection

The application detects when the browser goes offline and displays a notification to the user.

The offline state is intentionally lightweight because the assignment only requires basic offline detection.

The application does not currently provide full offline data synchronization.

---

## Key Trade-offs

### SQLite instead of PostgreSQL

SQLite keeps the project lightweight and easy to run locally without requiring an external database server.

For a multi-user production application, PostgreSQL or another server-based database would be more appropriate.

### React Query instead of Redux

The application primarily deals with server state rather than complex global client state.

React Query provides caching, mutations, loading states, and synchronization without introducing Redux boilerplate.

### Tailwind CSS

Tailwind was chosen to keep styling close to components and make responsive design quick to implement.

### Debounced Auto-Save

Auto-save uses debouncing rather than saving on every keystroke to reduce unnecessary API requests.

### Basic Offline Detection

The assignment only requires basic offline detection, so a full offline-first architecture was intentionally avoided to keep the scope focused.

---

## Known Limitations

* No authentication or user-specific notes
* Offline mode only detects connectivity; it does not support full offline editing/synchronization
* No conflict resolution for simultaneous edits
* No note version history
* No soft-delete/trash system
* SQLite is suitable for this assignment but not ideal for high-scale multi-user workloads
* Test coverage is intentionally focused on important behavior rather than complete coverage

---

## Bonus Features

### Implemented

* Dark Mode
* Export all notes as JSON
* Export all notes as Markdown

### Considered but Not Implemented

The following bonus features were intentionally left out to keep the implementation within the expected scope:

* Authentication
* Multi-device synchronization
* Conflict handling
* Soft delete and restore
* Version history
* E2E testing

The goal was to prioritize a polished core product experience rather than implementing every optional feature.

---

## What I Would Do Differently With More Time

If this application were being developed as a production product, I would consider:

* Adding authentication and user-specific notes
* Moving from SQLite to PostgreSQL
* Adding full offline-first support
* Implementing conflict resolution
* Adding note version history
* Adding Markdown preview/editing
* Adding comprehensive unit and integration tests
* Adding E2E tests using Playwright
* Adding CI/CD with automated tests and deployment
* Adding structured logging and monitoring
* Adding API rate limiting
* Improving accessibility testing
* Adding application-level error monitoring

---

## Current Status

### Completed

* Backend CRUD APIs
* SQLite persistence
* Request validation
* Search
* Debounced search
* Tag filtering
* Sorting
* Pagination
* Tags API
* Notes listing
* Create note
* Edit note
* Delete note
* Delete confirmation
* Optimistic delete updates
* Auto-save
* Offline detection
* Keyboard interaction
* Responsive UI
* Accessibility improvements
* Dark mode
* Export all notes as Markdown
* Export all notes as JSON
* Loading states
* Empty states
* Error states

### Remaining / Future Work

* Authentication
* Full offline synchronization
* Note version history
* E2E testing
* Production deployment and monitoring

---

## Deployment

### Frontend

The frontend is deployed on Render:

`https://notes-app-frontend-d6b2.onrender.com/`

### Backend

The backend API is deployed on Render:

`https://notes-app-backend-i2dj.onrender.com/api`

### Deployment Notes

- Frontend is deployed as a Render Static Site.
- Backend is deployed as a Render Web Service.
- SQLite is used for persistence.
- The application uses environment variables for the frontend API URL.
- The Render free tier may put the backend service to sleep after inactivity, so the first request after inactivity may take a little longer.
- SQLite data is stored on the service filesystem and is not intended as production-grade persistent storage for this deployment.


## Author

Vishal Solanki