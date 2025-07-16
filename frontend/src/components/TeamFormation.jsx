import { useState, useEffect } from 'react';
import SoccerField from './SoccerField';
import PlayerEditor from './PlayerEditor';
import FormationSelector from './FormationSelector';
import { DEFAULT_FORMATIONS, FORMATION_TYPES } from '../data/formations';
import './TeamFormation.css';

const TeamFormation = () => {
  const [currentFormation, setCurrentFormation] = useState(
    DEFAULT_FORMATIONS['4-3-3']
  );
  const [selectedFormationType, setSelectedFormationType] = useState('4-3-3');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isEditingFormation, setIsEditingFormation] = useState(false);
  const [showPlayerEditor, setShowPlayerEditor] = useState(false);

  // Update formation when type changes
  useEffect(() => {
    if (
      selectedFormationType !== 'custom' &&
      DEFAULT_FORMATIONS[selectedFormationType]
    ) {
      setCurrentFormation({ ...DEFAULT_FORMATIONS[selectedFormationType] });
      setSelectedPosition(null);
    }
  }, [selectedFormationType]);

  const handleFormationChange = (formationType) => {
    setSelectedFormationType(formationType);
    setIsEditingFormation(false);
    setSelectedPosition(null);
    setShowPlayerEditor(false);
  };

  const handlePositionClick = (position) => {
    setSelectedPosition(position);
    setShowPlayerEditor(true);
  };

  const handlePlayerUpdate = (playerId, updates) => {
    setCurrentFormation((prev) => ({
      ...prev,
      positions: prev.positions.map((pos) =>
        pos.id === playerId ? { ...pos, ...updates } : pos
      ),
    }));

    // Update selected position if it's the one being edited
    if (selectedPosition?.id === playerId) {
      setSelectedPosition((prev) => ({ ...prev, ...updates }));
    }
  };

  const handlePositionMove = (playerId, x, y) => {
    handlePlayerUpdate(playerId, { x, y });
    // Mark as custom formation when positions are moved
    if (selectedFormationType !== 'custom') {
      setSelectedFormationType('custom');
      setCurrentFormation((prev) => ({
        ...prev,
        name: 'Custom Formation',
      }));
    }
  };

  const toggleFormationEditing = () => {
    setIsEditingFormation(!isEditingFormation);
    setSelectedPosition(null);
    setShowPlayerEditor(false);
  };

  const resetFormation = () => {
    if (
      selectedFormationType !== 'custom' &&
      DEFAULT_FORMATIONS[selectedFormationType]
    ) {
      setCurrentFormation({ ...DEFAULT_FORMATIONS[selectedFormationType] });
    }
    setSelectedPosition(null);
    setShowPlayerEditor(false);
  };

  const createCustomFormation = () => {
    setSelectedFormationType('custom');
    setCurrentFormation({
      name: 'Custom Formation',
      positions: DEFAULT_FORMATIONS['4-3-3'].positions.map((pos) => ({
        ...pos,
      })),
    });
    setIsEditingFormation(true);
  };

  return (
    <div className='team-formation'>
      <div className='formation-header'>
        <h1>Team Formation Builder</h1>
        <p>Create and customize your team's formation</p>
      </div>

      <div className='formation-controls'>
        <FormationSelector
          selectedFormation={selectedFormationType}
          onFormationChange={handleFormationChange}
          onCreateCustom={createCustomFormation}
        />

        <div className='action-buttons'>
          <button
            className={`btn ${
              isEditingFormation ? 'btn-danger' : 'btn-primary'
            }`}
            onClick={toggleFormationEditing}
          >
            {isEditingFormation
              ? 'Exit Formation Edit'
              : 'Edit Formation Positions'}
          </button>

          {selectedFormationType !== 'custom' && (
            <button className='btn btn-secondary' onClick={resetFormation}>
              Reset Formation
            </button>
          )}
        </div>
      </div>

      <div className='formation-content'>
        <div className='field-section'>
          <div className='formation-info'>
            <h3>{currentFormation.name}</h3>
            <p>
              {isEditingFormation
                ? 'Drag players to reposition them on the field'
                : 'Click on a player to edit their details'}
            </p>
          </div>

          <SoccerField
            formation={currentFormation}
            onPositionClick={handlePositionClick}
            selectedPosition={selectedPosition}
            isEditingFormation={isEditingFormation}
            onPositionMove={handlePositionMove}
          />
        </div>

        {showPlayerEditor && selectedPosition && !isEditingFormation && (
          <div className='editor-section'>
            <PlayerEditor
              position={selectedPosition}
              onUpdate={(updates) =>
                handlePlayerUpdate(selectedPosition.id, updates)
              }
              onClose={() => {
                setShowPlayerEditor(false);
                setSelectedPosition(null);
              }}
            />
          </div>
        )}
      </div>

      {isEditingFormation && (
        <div className='formation-editing-help'>
          <div className='help-card'>
            <h4>Formation Editing Mode</h4>
            <ul>
              <li>Drag players around the field to customize positions</li>
              <li>
                Players will automatically be contained within field boundaries
              </li>
              <li>Moving players will create a custom formation</li>
              <li>Click "Exit Formation Edit" when you're done</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamFormation;
