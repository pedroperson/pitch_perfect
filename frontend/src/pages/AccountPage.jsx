import { useState } from 'react';
import '../account.css';

const AccountPage = ({ user, onLogout }) => {
  const [newName, setNewName] = useState(user.name);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateName = async () => {
    if (!newName.trim() || newName === user.name) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/auth/edit-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name: newName.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Name updated successfully!');
        // Update the user object in the parent component
        // This would ideally be handled by the parent, but for now we'll just show the message
        setIsEditing(false);
      } else {
        setMessage(data.error || 'Failed to update name');
      }
    } catch (error) {
      console.error('Update name error:', error);
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <div className="header">
          <h1 className="account-title">Account Settings</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="user-info">
          <h2>Your Profile</h2>
          
          <div className="info-group">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>

          <div className="info-group">
            <label>Name:</label>
            {isEditing ? (
              <div className="edit-name-container">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="edit-name-input"
                  placeholder="Enter new name"
                />
                <div className="edit-buttons">
                  <button 
                    onClick={handleUpdateName}
                    disabled={isLoading}
                    className="save-button"
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setNewName(user.name);
                    }}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="name-display">
                <span>{user.name}</span>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>

        <div className="coming-soon">
          <h3>Coming Soon</h3>
          <p>More account management features will be available here!</p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage; 