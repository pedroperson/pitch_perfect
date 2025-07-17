# Football Manager Backend

A Node.js/Express backend for the Football Manager application with authentication and session management.

## Features

- User authentication (login/register)
- Session management with cookies
- Password hashing with SHA-256
- Data persistence with LowDB/JSON files
- CORS configured for frontend integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

## Data Files

The server automatically creates the following data files on first run:
- `data/users.json` - User accounts and credentials
- `data/sessions.json` - Active user sessions

These files are created automatically when the server starts, so no manual setup is required.

## API Endpoints

- `POST /auth/register` - Create a new account
- `POST /auth/login` - Login with email/password
- `POST /auth/logout` - Logout and clear session
- `GET /auth/me` - Get current user info (protected)
- `PUT /auth/edit-name` - Update user name (protected)

## Environment

- Port: 3000 (configurable via PORT environment variable)
- CORS: Configured for `http://localhost:5173` (Vite dev server)
- Sessions: 7-day expiration with automatic cleanup 