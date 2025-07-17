import { FORMATION_TYPES } from '../data/formations';
import './FormationSelector.css';

const FormationSelector = ({
  selectedFormation,
  onFormationChange,
  savedFormations = {},
}) => {
  const defaultFormations = Object.entries(FORMATION_TYPES).filter(
    ([key]) => key !== 'custom'
  );

  const savedFormationEntries = Object.entries(savedFormations);
  const hasCustomFormations = savedFormationEntries.length > 0;

  const getFormationDisplayName = (key) => {
    if (FORMATION_TYPES[key]) {
      return FORMATION_TYPES[key];
    }
    if (savedFormations[key]) {
      return savedFormations[key].name;
    }
    return key;
  };

  return (
    <div className='formation-selector'>
      <h3>Select Formation</h3>

      <div className='formation-sections'>
        <div className='formation-section'>
          <h4>Standard Formations</h4>
          <div className='formation-options'>
            {defaultFormations.map(([key, value]) => (
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
          </div>
        </div>

        {hasCustomFormations && (
          <div className='formation-section'>
            <h4>Saved Formations</h4>
            <div className='formation-options'>
              {savedFormationEntries.map(([key, formation]) => (
                <button
                  key={key}
                  className={`formation-btn saved-formation ${
                    selectedFormation === key ? 'active' : ''
                  }`}
                  onClick={() => onFormationChange(key)}
                >
                  {formation.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='formation-description'>
        <p>Selected: {getFormationDisplayName(selectedFormation)}</p>
      </div>
    </div>
  );
};

export default FormationSelector;
