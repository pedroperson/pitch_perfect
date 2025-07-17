import TeamFormation from './components/TeamFormation';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/me', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <nav className='navbar'>
          <Link to='/' className='nav-brand'>
            Pitch Perfect
          </Link>
          <div className='nav-links'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
            <Link to='/formation' className='nav-link'>
              Formation Builder
            </Link>

            <Link to="/account" className="nav-link">
                Account
              </Link>
          </div>
        </nav>

        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                <HomePage user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/account" 
            element={
              user ? (
                <AccountPage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage onLoginSuccess={setUser} />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <RegisterPage />
              )
            } 
          />
          <Route path='/formation' element={<TeamFormation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
