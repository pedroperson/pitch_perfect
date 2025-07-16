// Formation positions are represented as percentages from top-left corner of the field
// x: 0-100 (left to right), y: 0-100 (top to bottom)

export const FORMATION_TYPES = {
  '4-3-3': '4-3-3',
  '3-5-2': '3-5-2',
  '4-4-2': '4-4-2',
  '4-2-3-1': '4-2-3-1',
  custom: 'Custom',
};

export const POSITION_NAMES = {
  GK: 'Goalkeeper',
  CB: 'Center Back',
  LB: 'Left Back',
  RB: 'Right Back',
  LWB: 'Left Wing Back',
  RWB: 'Right Wing Back',
  CDM: 'Defensive Midfielder',
  CM: 'Central Midfielder',
  CAM: 'Attacking Midfielder',
  LM: 'Left Midfielder',
  RM: 'Right Midfielder',
  LW: 'Left Winger',
  RW: 'Right Winger',
  ST: 'Striker',
  CF: 'Center Forward',
};

export const DEFAULT_FORMATIONS = {
  '4-3-3': {
    name: '4-3-3',
    positions: [
      { id: 1, x: 50, y: 90, position: 'GK', playerName: 'Player 1' },
      { id: 2, x: 15, y: 70, position: 'LB', playerName: 'Player 2' },
      { id: 3, x: 35, y: 70, position: 'CB', playerName: 'Player 3' },
      { id: 4, x: 65, y: 70, position: 'CB', playerName: 'Player 4' },
      { id: 5, x: 85, y: 70, position: 'RB', playerName: 'Player 5' },
      { id: 6, x: 30, y: 45, position: 'CM', playerName: 'Player 6' },
      { id: 7, x: 50, y: 45, position: 'CM', playerName: 'Player 7' },
      { id: 8, x: 70, y: 45, position: 'CM', playerName: 'Player 8' },
      { id: 9, x: 20, y: 20, position: 'LW', playerName: 'Player 9' },
      { id: 10, x: 50, y: 20, position: 'ST', playerName: 'Player 10' },
      { id: 11, x: 80, y: 20, position: 'RW', playerName: 'Player 11' },
    ],
  },
  '3-5-2': {
    name: '3-5-2',
    positions: [
      { id: 1, x: 50, y: 90, position: 'GK', playerName: 'Player 1' },
      { id: 2, x: 25, y: 70, position: 'CB', playerName: 'Player 2' },
      { id: 3, x: 50, y: 70, position: 'CB', playerName: 'Player 3' },
      { id: 4, x: 75, y: 70, position: 'CB', playerName: 'Player 4' },
      { id: 5, x: 10, y: 45, position: 'LWB', playerName: 'Player 5' },
      { id: 6, x: 30, y: 45, position: 'CM', playerName: 'Player 6' },
      { id: 7, x: 50, y: 45, position: 'CM', playerName: 'Player 7' },
      { id: 8, x: 70, y: 45, position: 'CM', playerName: 'Player 8' },
      { id: 9, x: 90, y: 45, position: 'RWB', playerName: 'Player 9' },
      { id: 10, x: 40, y: 20, position: 'ST', playerName: 'Player 10' },
      { id: 11, x: 60, y: 20, position: 'ST', playerName: 'Player 11' },
    ],
  },
  '4-4-2': {
    name: '4-4-2',
    positions: [
      { id: 1, x: 50, y: 90, position: 'GK', playerName: 'Player 1' },
      { id: 2, x: 15, y: 70, position: 'LB', playerName: 'Player 2' },
      { id: 3, x: 35, y: 70, position: 'CB', playerName: 'Player 3' },
      { id: 4, x: 65, y: 70, position: 'CB', playerName: 'Player 4' },
      { id: 5, x: 85, y: 70, position: 'RB', playerName: 'Player 5' },
      { id: 6, x: 15, y: 45, position: 'LM', playerName: 'Player 6' },
      { id: 7, x: 40, y: 45, position: 'CM', playerName: 'Player 7' },
      { id: 8, x: 60, y: 45, position: 'CM', playerName: 'Player 8' },
      { id: 9, x: 85, y: 45, position: 'RM', playerName: 'Player 9' },
      { id: 10, x: 40, y: 20, position: 'ST', playerName: 'Player 10' },
      { id: 11, x: 60, y: 20, position: 'ST', playerName: 'Player 11' },
    ],
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    positions: [
      { id: 1, x: 50, y: 90, position: 'GK', playerName: 'Player 1' },
      { id: 2, x: 15, y: 70, position: 'LB', playerName: 'Player 2' },
      { id: 3, x: 35, y: 70, position: 'CB', playerName: 'Player 3' },
      { id: 4, x: 65, y: 70, position: 'CB', playerName: 'Player 4' },
      { id: 5, x: 85, y: 70, position: 'RB', playerName: 'Player 5' },
      { id: 6, x: 35, y: 55, position: 'CDM', playerName: 'Player 6' },
      { id: 7, x: 65, y: 55, position: 'CDM', playerName: 'Player 7' },
      { id: 8, x: 20, y: 30, position: 'LW', playerName: 'Player 8' },
      { id: 9, x: 50, y: 30, position: 'CAM', playerName: 'Player 9' },
      { id: 10, x: 80, y: 30, position: 'RW', playerName: 'Player 10' },
      { id: 11, x: 50, y: 15, position: 'ST', playerName: 'Player 11' },
    ],
  },
};
