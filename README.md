# Football Manager

A full-stack football management application with React frontend and Node.js backend.

## Features

- **Authentication System**: User registration, login, and session management
- **Protected Routes**: All pages require authentication
- **Modern UI**: Clean, responsive design with CSS modules
- **Real-time Data**: Session persistence and user state management
- **Formation Builder**: Interactive team formation tool (coming soon)

## Project Structure

```
football_manager/
├── backend/           # Node.js/Express API server
│   ├── data/         # JSON data files (auto-created)
│   ├── lib/auth/     # Authentication logic
│   └── index.js      # Main server file
├── frontend/         # React/Vite application
│   ├── src/
│   │   ├── pages/    # Page components
│   │   ├── components/ # Reusable components
│   │   └── *.css     # Styled components
│   └── index.html
└── start-backend.sh  # Quick start script
```

## Quick Start

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start the server:**
   ```bash
   # Option 1: From backend directory
   npm start
   
   # Option 2: From project root
   ./start-backend.sh
   
   # Option 3: Development mode (auto-restart)
   npm run dev
   ```

The server will automatically create the necessary data files on first run:
- `backend/data/users.json` - User accounts
- `backend/data/sessions.json` - Active sessions

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Authentication Flow

1. **First Visit**: Users are redirected to login page
2. **Registration**: Create account with name, email, and password
3. **Login**: Authenticate with email and password
4. **Session Management**: 7-day cookie-based sessions
5. **Protected Routes**: All pages require authentication

## API Endpoints

- `POST /auth/register` - Create account
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `PUT /auth/edit-name` - Update user name

## Development

- **Backend**: Node.js with Express, LowDB for data persistence
- **Frontend**: React with Vite, React Router for navigation
- **Styling**: CSS modules with modern design patterns
- **Authentication**: SHA-256 password hashing, cookie-based sessions

## Data Persistence

The application uses JSON files for data storage:
- **Users**: Stored in `backend/data/users.json`
- **Sessions**: Stored in `backend/data/sessions.json`

All data files are automatically created when the server starts.

## Environment

- **Backend Port**: 3000
- **Frontend Port**: 5173
- **CORS**: Configured for local development
- **Sessions**: 7-day expiration with automatic cleanup