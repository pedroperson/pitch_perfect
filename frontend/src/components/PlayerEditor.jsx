import { useState } from 'react';
import { POSITION_NAMES } from '../data/formations';
import './PlayerEditor.css';

const PlayerEditor = ({ position, onUpdate, onClose, formation, onSwap }) => {
  const [playerName, setPlayerName] = useState(position.playerName);
  const [positionType, setPositionType] = useState(position.position);
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'swap'

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

  const handleSwap = (targetPlayerId) => {
    onSwap(position.id, targetPlayerId);
    onClose();
  };

  const getOtherPlayers = () => {
    return formation.positions.filter((player) => player.id !== position.id);
  };

  return (
    <div className='player-editor'>
      <div className='editor-header'>
        <h3>
          Player #{position.id} - {position.playerName}
        </h3>
        <button className='close-btn' onClick={handleCancel}>
          ×
        </button>
      </div>

      <div className='editor-tabs'>
        <button
          className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Details
        </button>
        <button
          className={`tab-btn ${activeTab === 'swap' ? 'active' : ''}`}
          onClick={() => setActiveTab('swap')}
        >
          Swap Positions
        </button>
      </div>

      {activeTab === 'edit' && (
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
      )}

      {activeTab === 'swap' && (
        <div className='swap-section'>
          <p className='swap-description'>
            Select a player to swap positions with:
          </p>

          <div className='players-list'>
            {getOtherPlayers().map((player) => (
              <div
                key={player.id}
                className='player-swap-option'
                onClick={() => handleSwap(player.id)}
              >
                <div className='player-swap-info'>
                  <div className='player-swap-number'>#{player.id}</div>
                  <div className='player-swap-details'>
                    <div className='player-swap-name'>{player.playerName}</div>
                    <div className='player-swap-position'>
                      {player.position}
                    </div>
                  </div>
                </div>
                <div className='swap-arrow'>⇄</div>
              </div>
            ))}
          </div>

          <div className='editor-actions'>
            <button className='btn btn-secondary' onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerEditor;
