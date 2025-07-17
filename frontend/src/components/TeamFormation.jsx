import { useState, useEffect } from 'react';
import SoccerField from './SoccerField';
import PlayerEditor from './PlayerEditor';
import FormationSelector from './FormationSelector';
import SaveFormationModal from './SaveFormationModal';
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
  const [savedFormations, setSavedFormations] = useState({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load saved formations from localStorage on component mount
  useEffect(() => {
    const savedFormationsData = localStorage.getItem(
      'pitchPerfectSavedFormations'
    );
    if (savedFormationsData) {
      try {
        setSavedFormations(JSON.parse(savedFormationsData));
      } catch (error) {
        console.error('Error loading saved formations:', error);
      }
    }
  }, []);

  // Update formation when type changes
  useEffect(() => {
    const allFormations = { ...DEFAULT_FORMATIONS, ...savedFormations };
    if (allFormations[selectedFormationType]) {
      setCurrentFormation({ ...allFormations[selectedFormationType] });
      setSelectedPosition(null);
      setHasUnsavedChanges(false);
    }
  }, [selectedFormationType, savedFormations]);

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

    setHasUnsavedChanges(true);
  };

  const handlePositionMove = (playerId, x, y) => {
    handlePlayerUpdate(playerId, { x, y });
  };

  const toggleFormationEditing = () => {
    setIsEditingFormation(!isEditingFormation);
    setSelectedPosition(null);
    setShowPlayerEditor(false);
  };

  const handleSaveFormation = () => {
    setShowSaveModal(true);
  };

  const saveFormation = (formationName) => {
    const formationKey = formationName.toLowerCase().replace(/\s+/g, '-');
    const newFormation = {
      ...currentFormation,
      name: formationName,
    };

    const updatedSavedFormations = {
      ...savedFormations,
      [formationKey]: newFormation,
    };

    setSavedFormations(updatedSavedFormations);
    localStorage.setItem(
      'pitchPerfectSavedFormations',
      JSON.stringify(updatedSavedFormations)
    );

    setHasUnsavedChanges(false);
    setSelectedFormationType(formationKey);
  };

  const getExistingFormationNames = () => {
    return Object.values(savedFormations).map((formation) =>
      formation.name.toLowerCase()
    );
  };

  const handlePlayerSwap = (playerId1, playerId2) => {
    console.log(`Swapping player ${playerId1} with player ${playerId2}`);

    setCurrentFormation((prev) => {
      console.log('Previous formation:', prev);

      // Create completely new positions array
      const newPositions = prev.positions.map((pos) => ({ ...pos }));
      const player1Index = newPositions.findIndex((p) => p.id === playerId1);
      const player2Index = newPositions.findIndex((p) => p.id === playerId2);

      console.log(
        `Player 1 index: ${player1Index}, Player 2 index: ${player2Index}`
      );

      if (player1Index !== -1 && player2Index !== -1) {
        const player1 = newPositions[player1Index];
        const player2 = newPositions[player2Index];

        console.log(
          `Before swap - Player ${playerId1}: (${player1.x}, ${player1.y}), Player ${playerId2}: (${player2.x}, ${player2.y})`
        );

        // Store original positions
        const temp = {
          x: player1.x,
          y: player1.y,
        };

        // Swap positions with completely new objects
        newPositions[player1Index] = {
          ...player1,
          x: player2.x,
          y: player2.y,
        };

        newPositions[player2Index] = {
          ...player2,
          x: temp.x,
          y: temp.y,
        };

        console.log(
          `After swap - Player ${playerId1}: (${newPositions[player1Index].x}, ${newPositions[player1Index].y}), Player ${playerId2}: (${newPositions[player2Index].x}, ${newPositions[player2Index].y})`
        );
      } else {
        console.error('Could not find one or both players for swap');
        return prev; // Return unchanged if players not found
      }

      const newFormation = {
        ...prev,
        positions: newPositions,
        // Add timestamp to force re-render
        lastUpdate: Date.now(),
      };
      console.log('New formation:', newFormation);
      return newFormation;
    });

    setHasUnsavedChanges(true);
    setSelectedPosition(null);
    setShowPlayerEditor(false);
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
          savedFormations={savedFormations}
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

          <button
            className={`btn ${
              hasUnsavedChanges ? 'btn-success' : 'btn-secondary'
            }`}
            onClick={handleSaveFormation}
            disabled={!hasUnsavedChanges}
          >
            {hasUnsavedChanges ? 'Save Formation' : 'No Changes to Save'}
          </button>
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
            {/* Debug info - remove this later */}
            <details
              style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}
            >
              <summary>Debug: Current Positions</summary>
              <pre
                style={{
                  fontSize: '10px',
                  maxHeight: '100px',
                  overflow: 'auto',
                }}
              >
                {JSON.stringify(
                  currentFormation.positions.map((p) => ({
                    id: p.id,
                    x: p.x,
                    y: p.y,
                    name: p.playerName,
                  })),
                  null,
                  2
                )}
              </pre>
            </details>
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
              formation={currentFormation}
              onUpdate={(updates) =>
                handlePlayerUpdate(selectedPosition.id, updates)
              }
              onSwap={handlePlayerSwap}
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
              <li>Click "Save Formation" to save your custom formation</li>
              <li>Click "Exit Formation Edit" when you're done</li>
            </ul>
          </div>
        </div>
      )}

      <SaveFormationModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={saveFormation}
        existingNames={getExistingFormationNames()}
      />
    </div>
  );
};

export default TeamFormation;
