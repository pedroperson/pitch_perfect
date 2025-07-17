import { useState } from 'react';
import './SaveFormationModal.css';

const SaveFormationModal = ({
  isOpen,
  onClose,
  onSave,
  existingNames = [],
}) => {
  const [formationName, setFormationName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    const trimmedName = formationName.trim();

    if (!trimmedName) {
      setError('Formation name is required');
      return;
    }

    if (trimmedName.length < 3) {
      setError('Formation name must be at least 3 characters');
      return;
    }

    if (trimmedName.length > 30) {
      setError('Formation name must be less than 30 characters');
      return;
    }

    if (existingNames.includes(trimmedName.toLowerCase())) {
      setError('A formation with this name already exists');
      return;
    }

    onSave(trimmedName);
    setFormationName('');
    setError('');
    onClose();
  };

  const handleCancel = () => {
    setFormationName('');
    setError('');
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className='save-modal-overlay'>
      <div className='save-modal'>
        <div className='save-modal-header'>
          <h3>Save Formation</h3>
          <button className='close-btn' onClick={handleCancel}>
            ×
          </button>
        </div>

        <div className='save-modal-content'>
          <p>Give your custom formation a name:</p>

          <div className='form-group'>
            <label htmlFor='formationName'>Formation Name:</label>
            <input
              id='formationName'
              type='text'
              value={formationName}
              onChange={(e) => {
                setFormationName(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyPress}
              placeholder='e.g., My Custom 4-3-3'
              maxLength={30}
              autoFocus
            />
            {error && <div className='error-message'>{error}</div>}
          </div>
        </div>

        <div className='save-modal-actions'>
          <button className='btn btn-primary' onClick={handleSave}>
            Save Formation
          </button>
          <button className='btn btn-secondary' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveFormationModal;
