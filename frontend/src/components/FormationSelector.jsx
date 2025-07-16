import { FORMATION_TYPES } from '../data/formations';
import './FormationSelector.css';

const FormationSelector = ({
  selectedFormation,
  onFormationChange,
  onCreateCustom,
}) => {
  const formations = Object.entries(FORMATION_TYPES).filter(
    ([key]) => key !== 'custom'
  );

  return (
    <div className='formation-selector'>
      <h3>Select Formation</h3>

      <div className='formation-options'>
        {formations.map(([key, value]) => (
          <button
            key={key}
            className={`formation-btn ${
              selectedFormation === key ? 'active' : ''
            }`}
            onClick={() => onFormationChange(key)}
          >
            {value}
          </button>
        ))}

        <button
          className={`formation-btn custom-btn ${
            selectedFormation === 'custom' ? 'active' : ''
          }`}
          onClick={onCreateCustom}
        >
          Custom Formation
        </button>
      </div>

      <div className='formation-description'>
        {selectedFormation === 'custom' ? (
          <p>
            Custom formation - modify player positions by dragging them on the
            field
          </p>
        ) : (
          <p>
            Selected: {FORMATION_TYPES[selectedFormation] || selectedFormation}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormationSelector;
