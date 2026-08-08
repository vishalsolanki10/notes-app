# Notes App

A full-stack Notes Application built using React, TypeScript, Express, and SQLite.

## Features

### Frontend

- List all notes
- Create new notes
- Edit existing notes
- Delete notes with confirmation dialog
- Optimistic UI updates for deletion
- Loading state handling
- Empty state handling
- Error state handling
- Responsive UI
- Accessible form labels and semantic HTML

### Backend

- Create Note API
- Get All Notes API
- Get Single Note API
- Update Note API
- Delete Note API
- Search Notes
- Filter Notes by Tag
- Sort Notes
- Pagination
- Tags API
- Request Validation using Zod
- SQLite Persistence

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Query
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript
- SQLite
- Better SQLite3
- Zod

---

## Project Structure

```text
notes-app/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
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
│
└── README.md
```

---

## API Endpoints

### Notes

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /api/notes | Get all notes |
| GET | /api/notes/:id | Get note by id |
| POST | /api/notes | Create note |
| PATCH | /api/notes/:id | Update note |
| DELETE | /api/notes/:id | Delete note |

### Query Parameters

```http
GET /api/notes?search=react
```

Search by title and content.

```http
GET /api/notes?tag=frontend
```

Filter by tag.

```http
GET /api/notes?sort=updatedAt
```

Sort notes.

```http
GET /api/notes?page=1&limit=10
```

Pagination.

---

### Tags

| Method | Endpoint |
|----------|----------|
| GET | /api/tags |

Returns all unique tags with usage count.

---

## Setup

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

Create `.env`

```env
PORT=5000
```

Run backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Current Status

### Completed

- Backend CRUD APIs
- SQLite Integration
- Validation Layer
- Search
- Filter
- Sort
- Pagination
- Tags API
- Notes Listing
- Create Note
- Edit Note
- Delete Note
- Confirmation Dialog
- Optimistic Delete Updates

### In Progress

- Debounced Search
- Tag Filter UI
- Sort UI
- Auto Save
- Offline Detection
- Keyboard Shortcuts
- Tests
- Deployment

---

## Architecture

Frontend communicates with backend using Axios.

React Query is used for:

- Server State Management
- Data Fetching
- Cache Management
- Optimistic Updates

Backend follows layered architecture:

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Database
```

---

## Future Improvements

- Debounced Search
- Auto Save
- Offline Support
- Keyboard Shortcuts
- Markdown Editor
- Dark Mode
- Authentication
- Version History

---

## Author

Vishal