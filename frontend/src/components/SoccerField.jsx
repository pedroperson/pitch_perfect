import { useState } from 'react';
import './SoccerField.css';

const SoccerField = ({
  formation,
  onPositionClick,
  selectedPosition,
  isEditingFormation,
  onPositionMove,
}) => {
  const [draggedPlayer, setDraggedPlayer] = useState(null);

  const handlePlayerClick = (position) => {
    if (!isEditingFormation) {
      onPositionClick(position);
    }
  };

  const handleDragStart = (e, position) => {
    if (isEditingFormation) {
      setDraggedPlayer(position);
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragOver = (e) => {
    if (isEditingFormation && draggedPlayer) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e) => {
    if (isEditingFormation && draggedPlayer) {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Keep positions within field bounds
      const boundedX = Math.max(5, Math.min(95, x));
      const boundedY = Math.max(5, Math.min(95, y));

      onPositionMove(draggedPlayer.id, boundedX, boundedY);
      setDraggedPlayer(null);
    }
  };

  return (
    <div className='soccer-field-container'>
      <div
        className='soccer-field'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Field markings */}
        <div className='field-markings'>
          <div className='center-circle'></div>
          <div className='center-line'></div>
          <div className='penalty-area penalty-area-top'></div>
          <div className='penalty-area penalty-area-bottom'></div>
          <div className='goal-area goal-area-top'></div>
          <div className='goal-area goal-area-bottom'></div>
        </div>

        {/* Player positions */}
        {formation.positions.map((position) => (
          <div
            key={position.id}
            className={`player-position ${
              selectedPosition?.id === position.id ? 'selected' : ''
            }`}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            onClick={() => handlePlayerClick(position)}
            draggable={isEditingFormation}
            onDragStart={(e) => handleDragStart(e, position)}
          >
            <div className='player-circle'>
              <span className='player-number'>{position.id}</span>
            </div>
            <div className='player-info'>
              <div className='player-name'>{position.playerName}</div>
              <div className='position-name'>{position.position}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoccerField;
