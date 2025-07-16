import { useState } from 'react';
import { POSITION_NAMES } from '../data/formations';
import './PlayerEditor.css';

const PlayerEditor = ({ position, onUpdate, onClose }) => {
  const [playerName, setPlayerName] = useState(position.playerName);
  const [positionType, setPositionType] = useState(position.position);

  const handleSave = () => {
    onUpdate({
      playerName: playerName.trim() || `Player ${position.id}`,
      position: positionType,
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className='player-editor'>
      <div className='editor-header'>
        <h3>Edit Player #{position.id}</h3>
        <button className='close-btn' onClick={handleCancel}>
          ×
        </button>
      </div>

      <div className='editor-form'>
        <div className='form-group'>
          <label htmlFor='playerName'>Player Name:</label>
          <input
            id='playerName'
            type='text'
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder='Enter player name'
            maxLength={20}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='positionType'>Position:</label>
          <select
            id='positionType'
            value={positionType}
            onChange={(e) => setPositionType(e.target.value)}
          >
            {Object.entries(POSITION_NAMES).map(([key, value]) => (
              <option key={key} value={key}>
                {key} - {value}
              </option>
            ))}
          </select>
        </div>

        <div className='editor-actions'>
          <button className='btn btn-primary' onClick={handleSave}>
            Save Changes
          </button>
          <button className='btn btn-secondary' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerEditor;
