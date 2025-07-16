import { Link } from 'react-router-dom';

const HomePage = ({ user }) => {
  return (
    <div className="home-container">
      <div className="home-card">
        <div className="header">
          <h1 className="welcome-title">Welcome to Football Manager!</h1>
          <Link to="/account" className="account-link">
            Account Settings
          </Link>
        </div>

        <div className="welcome-content">
          <p className="welcome-message">
            Hello, <strong>{user.name}</strong>! Welcome to your football management dashboard.
          </p>
          
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <Link to="/account" className="action-button">
                Manage Account
              </Link>
              <button className="action-button disabled">
                Create Team (Coming Soon)
              </button>
              <button className="action-button disabled">
                View Matches (Coming Soon)
              </button>
            </div>
          </div>
        </div>

        <div className="coming-soon">
          <h3>Coming Soon</h3>
          <p>Football management features will be available here!</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 