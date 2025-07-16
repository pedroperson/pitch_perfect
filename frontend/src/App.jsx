import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TeamFormation from './components/TeamFormation';
import './App.css';

function HomePage() {
  return (
    <div className='homepage'>
      <div>
        <h1>Pitch Perfect</h1>
        <p>Your ultimate soccer team management tool</p>
      </div>

      <div className='features'>
        <div className='feature-card'>
          <h3>Team Formation Builder</h3>
          <p>
            Create and customize your team's formation with our interactive
            soccer field
          </p>
          <Link to='/formation' className='btn btn-primary'>
            Build Formation
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className='app'>
        <nav className='navbar'>
          <Link to='/' className='nav-brand'>
            Pitch Perfect
          </Link>
          <div className='nav-links'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
            <Link to='/formation' className='nav-link'>
              Formation Builder
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/formation' element={<TeamFormation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
